import React, { useState, useEffect, useRef } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Box, Button, CircularProgress
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function PatientTable({ onRowClick }) {
    const [patientDemographics, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Fetch patients function
    const fetchPatients = async () => {
        try {
            const res = await fetch("https://3f975fd866ec.ngrok-free.app/patients/");
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

            const response = await fetch("https://3f975fd866ec.ngrok-free.app/process-pdf/", {
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
            {/* Upload Button */}
            <Box sx={{ mb: 2, width: "90%", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
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

            {/* Table */}
            <TableContainer component={Paper} sx={{ width: "90%", borderRadius: 3, boxShadow: 4 }}>
                <Typography
                    variant="h6"
                    sx={{ p: 2, fontWeight: "bold", borderBottom: "1px solid #ddd", backgroundColor: "#f1f3f6" }}
                >
                    Patient Details
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#fafafa" }}>
                            <TableCell><b>MRN</b></TableCell>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>DOB</b></TableCell>
                            <TableCell><b>Sex</b></TableCell>
                            <TableCell><b>Age</b></TableCell>
                            <TableCell><b>Contact</b></TableCell>
                            <TableCell><b>Address</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patientDemographics.map((patient) => (
                            <TableRow
                                key={patient.patient_id}
                                hover
                                sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#e3f2fd" } }}
                                onClick={() => onRowClick(patient)}
                            >
                                <TableCell>{patient.patient_id}</TableCell>
                                <TableCell>{`${patient.name.first} ${patient.name.last}`}</TableCell>
                                <TableCell>{patient.dob ? new Date(patient.dob).toLocaleDateString("en-US") : ""}</TableCell>
                                <TableCell>{patient.sex}</TableCell>
                                <TableCell>{patient.age}</TableCell>
                                <TableCell>
                                    {patient.contact.phone}
                                    {patient.contact.email && (
                                        <>
                                            <br />
                                            <a href={`mailto:${patient.contact.email}`}>{patient.contact.email}</a>
                                        </>
                                    )}
                                </TableCell>
                                <TableCell>
                                  {[
                                    patient.address?.line1,
                                    patient.address?.city,
                                    patient.address?.state,
                                    patient.address?.zip,
                                  ]
                                    .filter(Boolean) // remove empty/undefined/null
                                    .join(", ")}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
