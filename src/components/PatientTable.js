import React, { useState, useEffect, useRef } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Box, Button, CircularProgress, Chip
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function PatientTable({ onRowClick }) {
    const [patientDemographics, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Accent colors inspired by TabsPanel
    const accentColors = ["#1E88E5", "#22C55E", "#7C3AED", "#F59E0B"];
    const getAccentColor = (index) => accentColors[index % accentColors.length];

    const formatAddress = (addr) => {
        if (!addr) return "";
        return [addr.line1, addr.city, addr.state, addr.zip].filter(Boolean).join(", ");
    };

    // Fetch patients function
    const fetchPatients = async () => {
        try {
            const res = await fetch("https://648ae054784a.ngrok-free.app/patients/");
            const data = await res.json();
            const demographics = data.patients.map((p) => ({
                ...p.ai_response.patient_demographics,
                _id: p._id,
            }));

            // Update local storage
            localStorage.setItem("patientData", JSON.stringify(data));
            localStorage.setItem("patientDemographics", JSON.stringify(demographics));

            setPatients(demographics);
        } catch (err) {
            console.error("Error fetching patients:", err);
        }
    };

    useEffect(() => {
        // Load saved demographics first
        const saved = localStorage.getItem("patientDemographics");
        if (saved) {
            setPatients(JSON.parse(saved));
        }
        // Then fetch fresh data
        fetchPatients();
    }, []);

    // Convert file to Base64
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });

    // Trigger file input click
    const handleButtonClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    // Handle file selection and upload
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setLoading(true); // start loading
        try {
            const base64File = await toBase64(selectedFile);

            const payload = {
                filename: selectedFile.name,
                pdf_base64: base64File,
            };

            const response = await fetch("https://648ae054784a.ngrok-free.app/process-pdf/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log("Upload response:", result);
            alert("Document uploaded successfully!");

            // Reset local storage and fetch updated patients
            localStorage.removeItem("patientData");
            localStorage.removeItem("patientDemographics");
            await fetchPatients();
        } catch (err) {
            console.error("Upload error:", err);
            alert("Failed to upload document");
        } finally {
            setLoading(false); // stop loading
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 6 }}>
            {/* Header with Title and Upload Button */}
            <Box sx={{ mb: 3, width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "text.primary", fontSize: "28px" }}
                >
                    Patient Details
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <input
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleButtonClick}
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload Patient Document"}
                    </Button>

                    {loading && <CircularProgress size={24} />}
                </Box>
            </Box>

            {/* Enhanced Table */}
            <TableContainer 
                component={Paper} 
                sx={{ 
                    width: "90%", 
                    borderRadius: 3, 
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.06)"
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ 
                            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                            "& .MuiTableCell-head": {
                                fontWeight: "bold",
                                fontSize: "14px",
                                color: "#1e293b",
                                borderBottom: "2px solid #e2e8f0"
                            }
                        }}>
                            <TableCell sx={{ borderTopLeftRadius: "12px" }}>MRN</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>DOB</TableCell>
                            <TableCell>Sex</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell sx={{ borderTopRightRadius: "12px" }}>Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patientDemographics.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} sx={{ textAlign: "center", py: 4 }}>
                                    <Typography color="text.secondary">No patients found</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                        
                        {patientDemographics.map((patient, index) => {
                            const accent = getAccentColor(index);
                            const fullName = `${patient?.name?.first || ""} ${patient?.name?.last || ""}`.trim();
                            const mrn = patient?.patient_id || patient?._id || "Unknown";
                            const dobText = patient?.dob ? new Date(patient.dob).toLocaleDateString("en-US") : "—";
                            const sex = patient?.sex || "—";
                            const age = patient?.age ?? "—";
                            const phone = patient?.contact?.phone || "—";
                            const email = patient?.contact?.email;
                            const address = formatAddress(patient?.address);

                            return (
                                <TableRow
                                    key={mrn}
                                    hover
                                    onClick={() => onRowClick(patient)}
                                    sx={{ 
                                        cursor: "pointer",
                                        borderLeft: `4px solid ${accent}`,
                                        transition: "all 0.2s ease",
                                        "&:hover": { 
                                            backgroundColor: "#f8fafc",
                                            transform: "scale(1.01)",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                                        },
                                        "&:nth-of-type(even)": {
                                            backgroundColor: "rgba(248, 250, 252, 0.5)"
                                        },
                                        "& .MuiTableCell-body": {
                                            borderBottom: "1px solid #f1f5f9",
                                            py: 2
                                        }
                                    }}
                                >
                                    <TableCell>
                                        <Chip 
                                            label={mrn} 
                                            size="small" 
                                            variant="outlined"
                                            sx={{ 
                                                fontWeight: "bold",
                                                borderColor: accent,
                                                color: accent
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: "600", color: "text.primary" }}>
                                            {fullName || "Unnamed Patient"}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="text.secondary">
                                            {dobText}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={sex} 
                                            size="small" 
                                            color="primary" 
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={age} 
                                            size="small" 
                                            color="success" 
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                            <Typography variant="body2" sx={{ color: "text.primary" }}>
                                                {phone}
                                            </Typography>
                                            {email && (
                                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                    <a href={`mailto:${email}`} style={{ color: accent, textDecoration: "none" }}>
                                                        {email}
                                                    </a>
                                                </Typography>
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                            {address || "—"}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
