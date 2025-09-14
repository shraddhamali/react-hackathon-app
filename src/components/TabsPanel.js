import React from "react";
import { Tabs, Tab, Box, Typography, Paper, Divider, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import MedicalTimeline from "./MedicalTimeline";
import PatientGraph from "./PatientGraph";

export default function TabsPanel({ patient, onBackToTable }) {
    const [tabValue, setTabValue] = React.useState("summary");
    const navigate = useNavigate();
    const mainContentRef = React.useRef(null);

    // Patient Summary Data
    const patientSummary = {
        "one_liner": "Spanish-speaking 68F with HTN, hyperlipidemia, obesity, osteopenia (lumbar), pre-diabetes with normal A1c, and history of colon polyp; BP controlled on olmesartan/amlodipine; immunizations up to date; 2022 mammogram negative.",
        "top_problems": [
            "Essential hypertension",
            "Hyperlipidemia",
            "Morbid obesity",
            "Pre-diabetes",
            "Osteopenia of lumbar spine",
            "Chronic low back pain",
            "GERD without esophagitis",
            "Colon polyp (repeat colonoscopy due 2029)"
        ],
        "allergies": [
            { "substance": "ACE inhibitors", "reaction": "cough", "noted_date": "2018-10-01" }
        ],
        "medications": [
            { "name": "Olmesartan", "dosage": "40 mg PO daily", "start": "2022-01-31", "status": "active" },
            { "name": "Amlodipine", "dosage": "2.5 mg PO daily", "start": "2021-11-04", "status": "active" },
            { "name": "Gabapentin", "dosage": "100 mg PO nightly", "start": "2022-11-28", "status": "active" },
            { "name": "Ibuprofen", "dosage": "600 mg PO q6h PRN pain", "start": "2022-02-03", "status": "active" },
            { "name": "Mometasone 0.1% ointment", "dosage": "Apply to affected area daily", "start": "2020-11-13", "status": "active" },
            { "name": "Diazepam", "dosage": "2 mg PO 30 min before flight; may repeat once PRN", "start": "2020-10-20", "status": "active" },
            { "name": "Acetaminophen", "dosage": "500 mg PO PRN pain", "start": null, "status": "active" },
            { "name": "MetroNIDAZOLE 0.75% vaginal gel", "dosage": "1 applicator PV qHS", "start": "2022-01-27", "stop": "2022-02-03", "status": "completed" }
        ],
        "recent_encounters": [
            { "date": "2022-12-16", "encounter": "Breast Health Center", "reason": "Screening mammogram", "outcome": "BI-RADS 1 (negative)" },
            { "date": "2022-02-03", "encounter": "Family Medicine", "reason": "Hypertension follow-up", "outcome": "BP controlled; vaccines/labs ordered" },
            { "date": "2022-01-27", "encounter": "Gyn Clinic", "reason": "Vaginal discharge/odor", "outcome": "BV treated with metrogel" }
        ]
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const handleBackToTable = () => {
        if (onBackToTable) {
            onBackToTable();
        }
    };




    return (
        <Box sx={{ display: "flex", height: "100vh", background: "#f8f9fa" }}>
            {/* Left Vertical Tabs */}
            <Box
                sx={{
                    width: 240,
                    bgcolor: "background.paper",
                    borderRight: 1,
                    borderColor: "divider",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Header with patient info and logout */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                        {patient.name.first} {patient.name.last}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        MRN: {patient.patient_id}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleBackToTable}
                            sx={{ flex: 1 }}
                        >
                            Back to Table
                        </Button>
                        <IconButton
                            size="small"
                            onClick={handleLogout}
                            color="error"
                        >
                            <Logout />
                        </IconButton>
                    </Box>
                </Box>

                {/* Main Navigation Tabs */}
                <Tabs
                    orientation="vertical"
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                        flex: 1,
                        "& .MuiTab-root": {
                            transition: "all 0.3s ease-in-out",
                            "&.Mui-selected": {
                                backgroundColor: "#e3f2fd",
                                color: "#1565c0",
                                fontWeight: "bold",
                                transform: "translateX(4px)",
                                boxShadow: "0 2px 8px rgba(21, 101, 192, 0.2)"
                            },
                            "&:hover": {
                                backgroundColor: "#f5f5f5",
                                transform: "translateX(2px)"
                            }
                        }
                    }}
                >
                    <Tab
                        value="summary"
                        label="Patient Summary & Graphs"
                        sx={{
                            textAlign: "left",
                            alignItems: "flex-start",
                            px: 2,
                            py: 1.5
                        }}
                    />
                    <Tab
                        value="trends"
                        label="Trends"
                        sx={{
                            textAlign: "left",
                            alignItems: "flex-start",
                            px: 2,
                            py: 1.5
                        }}
                    />
                    <Tab
                        value="signals"
                        label="Health Signals"
                        sx={{
                            textAlign: "left",
                            alignItems: "flex-start",
                            px: 2,
                            py: 1.5
                        }}
                    />
                </Tabs>

            </Box>

            {/* Main content area */}
            <Box
                ref={mainContentRef}
                sx={{
                    flex: 1,
                    p: 3,
                    position: "relative",
                    overflowY: "auto",
                    scrollBehavior: "smooth",
                    transition: "all 0.3s ease-in-out"
                }}
            >
                {tabValue === "summary" && (
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                        height: "100%",
                        minHeight: "100vh"
                    }}>
                        {/* Left side - Patient Details and Summary */}
                        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minHeight: "100%" }}>
                            {/* Overview Section */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1, color: "#2c3e50" }}>
                                    Patient Overview
                                </Typography>
                                <Typography variant="body1" sx={{ color: "#666", fontSize: "16px" }}>
                                    Comprehensive view of patient information, medical history, and current health status.
                                </Typography>
                            </Box>

                            {/* Patient Details in One Line */}
                            <Box>
                                <Paper
                                    sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 3,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                        <b>MRN:</b> {patient.patient_id}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                        <b>Name:</b> {patient.name.first} {patient.name.last}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                        <b>DOB:</b> {new Date(patient.dob).toLocaleDateString("en-US")}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                        <b>Sex:</b> {patient.sex}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                        <b>Age:</b> {patient.age}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                        <b>Contact:</b> {patient.contact.phone}
                                        {patient.contact.email && ` | ${patient.contact.email}`}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                        <b>Address:</b> {patient.address.line1}, {patient.address.city}, {patient.address.state} {patient.address.zip}
                                    </Typography>
                                </Paper>
                            </Box>

                            {/* Patient Summary Section */}
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {/* One Liner */}
                                <Paper sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
                                    border: "1px solid #bbdefb"
                                }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#1565c0" }}>
                                        📋 Patient Summary
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: "14px", lineHeight: 1.6, color: "#424242" }}>
                                        {patientSummary.one_liner}
                                    </Typography>
                                </Paper>

                                {/* Top Problems and Allergies Row */}
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    {/* Top Problems */}
                                    <Paper sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        flex: 1,
                                        background: "linear-gradient(135deg, #ffebee 0%, #fce4ec 100%)",
                                        border: "1px solid #ffcdd2"
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#c62828" }}>
                                            🚨 Top Problems
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                            {patientSummary.top_problems.map((problem, index) => (
                                                <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <Box sx={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: "50%",
                                                        bgcolor: "#f44336",
                                                        flexShrink: 0,
                                                        boxShadow: "0 2px 4px rgba(244, 67, 54, 0.3)"
                                                    }} />
                                                    <Typography variant="body2" sx={{ fontSize: "13px", color: "#424242" }}>
                                                        {problem}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Paper>

                                    {/* Allergies */}
                                    <Paper sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        flex: 1,
                                        background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
                                        border: "1px solid #ffcc02"
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#ef6c00" }}>
                                            ⚠️ Allergies
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                            {patientSummary.allergies.map((allergy, index) => (
                                                <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <Box sx={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: "50%",
                                                        bgcolor: "#ff9800",
                                                        flexShrink: 0,
                                                        boxShadow: "0 2px 4px rgba(255, 152, 0, 0.3)"
                                                    }} />
                                                    <Typography variant="body2" sx={{ fontSize: "13px", color: "#424242" }}>
                                                        <strong>{allergy.substance}</strong> - {allergy.reaction}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Paper>
                                </Box>

                                {/* Medications and Recent Encounters Row */}
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    {/* Medications */}
                                    <Paper sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        flex: 1,
                                        background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
                                        border: "1px solid #a5d6a7"
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#2e7d32" }}>
                                            💊 Medications
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8, maxHeight: "200px", overflowY: "auto" }}>
                                            {patientSummary.medications.map((med, index) => (
                                                <Box key={index} sx={{
                                                    p: 1.5,
                                                    background: "linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%)",
                                                    borderRadius: 2,
                                                    border: "1px solid #c8e6c9",
                                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                                                }}>
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                                                        <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: "bold", color: "#1b5e20" }}>
                                                            {med.name}
                                                        </Typography>
                                                        <Box sx={{
                                                            px: 1.2,
                                                            py: 0.3,
                                                            borderRadius: 2,
                                                            bgcolor: med.status === "active" ? "#c8e6c9" : "#ffcdd2",
                                                            color: med.status === "active" ? "#1b5e20" : "#c62828",
                                                            fontSize: "11px",
                                                            fontWeight: "bold",
                                                            border: med.status === "active" ? "1px solid #a5d6a7" : "1px solid #ffab91"
                                                        }}>
                                                            {med.status}
                                                        </Box>
                                                    </Box>
                                                    <Typography variant="body2" sx={{ fontSize: "12px", color: "#424242", mb: 0.3 }}>
                                                        {med.dosage}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ fontSize: "11px", color: "#666666" }}>
                                                        Start: {med.start || "Unknown"}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Paper>

                                    {/* Recent Encounters */}
                                    <Paper sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        flex: 1,
                                        background: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
                                        border: "1px solid #ce93d8"
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#7b1fa2" }}>
                                            🏥 Recent Encounters
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                                            {patientSummary.recent_encounters.map((encounter, index) => (
                                                <Box key={index} sx={{
                                                    p: 1.5,
                                                    background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)",
                                                    borderRadius: 2,
                                                    border: "1px solid #f8bbd9",
                                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                                                }}>
                                                    <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: "bold", color: "#4a148c", mb: 0.3 }}>
                                                        {encounter.encounter}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ fontSize: "11px", color: "#424242", mb: 0.3 }}>
                                                        <strong>Date:</strong> {encounter.date}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ fontSize: "11px", color: "#424242", mb: 0.3 }}>
                                                        <strong>Reason:</strong> {encounter.reason}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ fontSize: "11px", color: "#424242" }}>
                                                        <strong>Outcome:</strong> {encounter.outcome}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Paper>
                                </Box>
                            </Box>
                        </Box>

                        {/* Right side - Medical Timeline */}
                        <Box sx={{
                            width: 400,
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            minHeight: "100vh"
                        }}>
                            <Paper
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    overflow: "hidden",
                                    height: "100%",
                                    minHeight: "100vh",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {/* Timeline Header */}
                                <Box
                                    sx={{
                                        p: 2,
                                        borderBottom: 1,
                                        borderColor: "divider",
                                        flexShrink: 0
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px" }}>
                                        Medical Timeline
                                    </Typography>
                                </Box>

                                {/* Timeline Content */}
                                <Box sx={{
                                    flex: 1,
                                    overflow: "auto",
                                    minHeight: "calc(100vh - 80px)"
                                }}>
                                    <MedicalTimeline />
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                )}


                {tabValue === "trends" && (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        height: "100%"
                    }}>
                        {/* Medical Graphs Title */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "20px" }}>
                                Medical Graphs - {patient.name.first} {patient.name.last}
                            </Typography>
                        </Box>

                        {/* Medical Graphs - 2 per row */}
                        <Box sx={{ flex: 1, overflow: "auto" }}>
                            <PatientGraph patient={patient} />
                        </Box>
                    </Box>
                )}

                {tabValue === "signals" && (
                    <Paper sx={{
                        p: 3,
                        borderRadius: 3,
                        boxShadow: 3
                    }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Health Signals
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography>Alerts, warnings, etc...</Typography>
                    </Paper>
                )}
            </Box>
        </Box>
    );
}
