import React from "react";
import { Tabs, Tab, Box, Typography, Paper, Divider, Button, IconButton, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Logout, ExpandMore, ExpandLess } from "@mui/icons-material";
import MedicalTimeline from "./MedicalTimeline";
import PatientGraph from "./PatientGraph";

export default function TabsPanel({ patient, onBackToTable }) {
    const [tabValue, setTabValue] = React.useState("summary");
    const [timelineExpanded, setTimelineExpanded] = React.useState(false);
    const navigate = useNavigate();

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

    const handleTimelineToggle = () => {
        setTimelineExpanded(!timelineExpanded);
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

                <Tabs
                    orientation="vertical"
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{ flex: 1 }}
                >
                    <Tab value="summary" label="Patient Summary & Graphs" />
                    <Tab value="trends" label="Trends" />
                    <Tab value="signals" label="Health Signals" />
                </Tabs>
            </Box>

            {/* Main content area */}
            <Box sx={{ flex: 1, p: 3, position: "relative" }}>
                {tabValue === "summary" && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
                        {/* Row 1: Patient Details in One Line */}
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

                        {/* Row 2: Medical Timeline - Collapsible */}
                        <Paper
                            sx={{
                                borderRadius: 3,
                                boxShadow: 3,
                                overflow: "hidden",
                            }}
                        >
                            {/* Timeline Header with Toggle Button */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: 2,
                                    borderBottom: timelineExpanded ? 1 : 0,
                                    borderColor: "divider",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                    },
                                }}
                                onClick={handleTimelineToggle}
                            >
                                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px" }}>
                                    Medical Timeline
                                </Typography>
                                <IconButton size="small">
                                    {timelineExpanded ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </Box>

                            {/* Collapsible Timeline Content */}
                            <Collapse in={timelineExpanded}>
                                <Box sx={{ height: "300px" }}>
                                    <MedicalTimeline />
                                </Box>
                            </Collapse>
                        </Paper>

                        {/* Row 3: Medical Graphs Title */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "20px" }}>
                                Medical Graphs - {patient.name.first} {patient.name.last}
                            </Typography>
                        </Box>

                        {/* Row 4+: Medical Graphs - 2 per row */}
                        <Box sx={{ flex: 1, overflow: "auto" }}>
                            <PatientGraph patient={patient} />
                        </Box>
                    </Box>
                )}


                {tabValue === "trends" && (
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Trends
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography>Charts, graphs, etc...</Typography>
                    </Paper>
                )}

                {tabValue === "signals" && (
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
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
