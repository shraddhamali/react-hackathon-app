import React, { useEffect, useState } from "react";
import { Box, Divider, Paper, Tab, Tabs, Typography, Grid, Chip } from "@mui/material";
import MedicalTimeline from "./MedicalTimeline";
import PatientGraph from "./PatientGraph";
import Chatbot from "./chatbot";
import IconRail from "./ui/IconRail";
import KpiCard from "./ui/KpiCard";
import PatientProfileCard from "./ui/PatientProfileCard";
import ChartTypeFilter from "./ChartTypeFilter";

export default function TabsPanel({ patient }) {
    const [tabValue, setTabValue] = React.useState("summary");
    const mainContentRef = React.useRef(null);

    const [patientSummaryResponse, setPatientSummary] = useState([]);

    const [healthSignalResponse, setHealthSignal] = useState([]);
    const [trendsData, setTrendsData] = useState([]);
    const [selectedChartType, setSelectedChartType] = useState('all');


    useEffect(() => {

        const storedData = localStorage.getItem("patientData");

        if (storedData) {
            const patients = JSON.parse(storedData).patients || [];

            const patientDetail = patients.find((p) => p._id === patient._id);

            if (patientDetail && patientDetail.ai_response && patientDetail.ai_response.patient_summary) {
                setPatientSummary(patientDetail.ai_response.patient_summary);
            }

            if (patientDetail && patientDetail.ai_response && patientDetail.ai_response.status_and_risk_factors) {
                setHealthSignal(patientDetail.ai_response.status_and_risk_factors);
            }

            if (patientDetail && patientDetail.ai_response && patientDetail.ai_response.graphs) {
                setTrendsData(patientDetail.ai_response.graphs);
            }

        }
    }, [patient]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };



    return (
        <Box sx={{ display: "flex", height: "100vh", background: "transparent" }}>
            {/* Left Icon Rail */}
            <IconRail
                activeTab={tabValue}
                onTabChange={(newTab) => setTabValue(newTab)}
            />

            {/* Main content area */}
            <Box
                ref={mainContentRef}
                sx={{
                    flex: 1,
                    p: 3,
                    position: "relative",
                    overflowY: "auto",
                    scrollBehavior: "smooth",
                    transition: "all 0.3s ease-in-out",
                    backgroundColor: "white",
                    width: "100%",
                    minWidth: 0  // Allow shrinking
                }}
            >
                {tabValue === "summary" && (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        height: "100%",
                        minHeight: "100vh",
                        width: "100%"
                    }}>
                        {/* Overview Section */}
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}>
                                Patient Overview
                            </Typography>
                            <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "16px" }}>
                                Comprehensive view of patient information, medical history, and current health status.
                            </Typography>
                        </Box>

                        {/* KPI Tiles Row */}
                        <Box sx={{
                            display: "flex",
                            gap: 3,
                            mb: 3,
                            width: "100%",
                            '& > *': {
                                flex: 1,
                                minWidth: 0, // Allow cards to shrink
                            },
                            '@media (max-width: 1200px)': {
                                flexWrap: "wrap",
                                '& > *': {
                                    flex: '1 1 calc(50% - 12px)',
                                    minWidth: 200,
                                },
                            },
                            '@media (max-width: 768px)': {
                                '& > *': {
                                    flex: '1 1 100%',
                                },
                            },
                        }}>
                            <KpiCard
                                title="Heartbeat"
                                value="85"
                                unit="bpm"
                                trend="up"
                                variant="success"
                            />
                            <KpiCard
                                title="Blood Pressure"
                                value="100"
                                unit="80 mmHg"
                                trend="stable"
                                variant="primary"
                            />
                            <KpiCard
                                title="Haemoglobin"
                                value="17.5"
                                unit="g/dL"
                                trend="down"
                                variant="warning"
                            />
                            <KpiCard
                                title="Sugar Levels"
                                value="100"
                                unit="mg/dL"
                                trend="stable"
                                variant="primary"
                            />
                        </Box>

                        {/* Main Content Row */}
                        <Box sx={{
                            display: "flex",
                            gap: 3,
                            flex: 1,
                        }}>
                            {/* Left Column - Patient Profile Card */}
                            <Box sx={{ width: 350 }}>
                                <PatientProfileCard patient={patient} />
                            </Box>

                            {/* Middle Column - Patient Summary */}
                            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>

                                {/* Patient Summary Section */}
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    {/* One Liner */}
                                    <Paper sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        borderTop: "4px solid #22C55E",
                                        backgroundColor: "background.paper"
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}>
                                            Patient Summary
                                        </Typography>
                                        <Typography variant="body2"
                                            sx={{ fontSize: "14px", lineHeight: 1.6, color: "text.secondary" }}>
                                            {patientSummaryResponse?.one_liner || "No summary available"}
                                        </Typography>
                                    </Paper>

                                    {/* Top Problems and Allergies Row */}
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        {/* Top Problems */}
                                        <Paper sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            flex: 1,
                                            borderTop: "4px solid #EF4444",
                                            backgroundColor: "background.paper"
                                        }}>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}>
                                                Top Problems
                                            </Typography>
                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                                {patientSummaryResponse?.top_problems?.map((problem, index) => (
                                                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <Box sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: "50%",
                                                            bgcolor: "#f44336",
                                                            flexShrink: 0,
                                                            boxShadow: "0 2px 4px rgba(244, 67, 54, 0.3)"
                                                        }} />
                                                        <Typography variant="body2"
                                                            sx={{ fontSize: "13px", color: "#424242" }}>
                                                            {problem}
                                                        </Typography>
                                                    </Box>
                                                )) || <Typography>No problems found</Typography>}
                                            </Box>
                                        </Paper>

                                        {/* Allergies */}
                                        <Paper sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            flex: 1,
                                            borderTop: "4px solid #F59E0B",
                                            backgroundColor: "background.paper"
                                        }}>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}>
                                                Allergies
                                            </Typography>
                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                                {patientSummaryResponse?.allergies?.map((allergy, index) => (
                                                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <Box sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: "50%",
                                                            bgcolor: "#ff9800",
                                                            flexShrink: 0,
                                                            boxShadow: "0 2px 4px rgba(255, 152, 0, 0.3)"
                                                        }} />
                                                        <Typography variant="body2"
                                                            sx={{ fontSize: "13px", color: "#424242" }}>
                                                            <strong>{allergy.substance}</strong> - {allergy.reaction}
                                                        </Typography>
                                                    </Box>
                                                )) || <Typography>No allergies reported</Typography>}
                                            </Box>
                                        </Paper>
                                    </Box>

                                    {/* Medications and Recent Encounters Row */}
                                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                                        {/* Medications */}
                                        <Paper sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            flex: 1,
                                            borderTop: "4px solid #22C55E",
                                            backgroundColor: "background.paper"
                                        }}>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}>
                                                Medications
                                            </Typography>
                                            <Box sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 0.8,
                                                maxHeight: "320px", // Height for approximately 4 items
                                                overflowY: "auto",
                                                overflowX: "hidden",
                                                pr: 1, // Right padding for scrollbar space
                                                "&::-webkit-scrollbar": {
                                                    width: "6px",
                                                },
                                                "&::-webkit-scrollbar-track": {
                                                    background: "#F1F5F9",
                                                    borderRadius: "3px",
                                                },
                                                "&::-webkit-scrollbar-thumb": {
                                                    background: "#CBD5E1",
                                                    borderRadius: "3px",
                                                    "&:hover": {
                                                        background: "#94A3B8",
                                                    },
                                                },
                                            }}>
                                                {patientSummaryResponse?.medications?.map((med, index) => (
                                                    <Box key={index} sx={{
                                                        p: 1.5,
                                                        background: "linear-gradient(135deg,rgb(176, 255, 205) 0%,rgb(255, 255, 255) 100%)",
                                                        borderRadius: 2,
                                                        border: "1px solid #DCFCE7",
                                                        borderLeft: "3px solid #22C55E",
                                                        boxShadow: "0 1px 3px rgba(22, 19, 19, 0.04)",
                                                        transition: "all 0.2s ease",
                                                        "&:hover": {
                                                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                                            transform: "translateY(-1px)",
                                                        }
                                                    }}>
                                                        <Box sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            mb: 0.5
                                                        }}>
                                                            <Typography variant="body2" sx={{
                                                                fontSize: "13px",
                                                                fontWeight: "bold",
                                                                color: "#0F172A",
                                                                fontFamily: "Poppins"
                                                            }}>
                                                                {med.name}
                                                            </Typography>
                                                            <Box sx={{
                                                                px: 1.2,
                                                                py: 0.3,
                                                                borderRadius: 2,
                                                                bgcolor: med.status === "active" ? "#DCFCE7" : "#FEE2E2",
                                                                color: med.status === "active" ? "#22C55E" : "#EF4444",
                                                                fontSize: "11px",
                                                                fontWeight: "bold",
                                                                fontFamily: "Poppins",
                                                                border: med.status === "active" ? "1px solid #DCFCE7" : "1px solid #FEE2E2"
                                                            }}>
                                                                {med.status}
                                                            </Box>
                                                        </Box>
                                                        <Typography variant="body2"
                                                            sx={{
                                                                fontSize: "12px",
                                                                color: "#475569",
                                                                mb: 0.3,
                                                                fontFamily: "Poppins"
                                                            }}>
                                                            {med.dosage}
                                                        </Typography>
                                                        <Typography variant="body2"
                                                            sx={{
                                                                fontSize: "11px",
                                                                color: "#64748B",
                                                                fontFamily: "Poppins",
                                                                fontWeight: 500
                                                            }}>
                                                            Start: {med.start || "Unknown"}
                                                        </Typography>
                                                    </Box>
                                                )) || <Typography>No medications found</Typography>}
                                            </Box>
                                        </Paper>

                                        {/* Recent Encounters */}
                                        <Paper sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            flex: 1,
                                            borderTop: "4px solid #7C3AED",
                                            backgroundColor: "background.paper"
                                        }}>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}>
                                                Recent Encounters
                                            </Typography>
                                            <Box sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 0.8,
                                                maxHeight: "320px", // Height for approximately 4 items
                                                overflowY: "auto",
                                                overflowX: "hidden",
                                                pr: 1, // Right padding for scrollbar space
                                                "&::-webkit-scrollbar": {
                                                    width: "6px",
                                                },
                                                "&::-webkit-scrollbar-track": {
                                                    background: "#F1F5F9",
                                                    borderRadius: "3px",
                                                },
                                                "&::-webkit-scrollbar-thumb": {
                                                    background: "#CBD5E1",
                                                    borderRadius: "3px",
                                                    "&:hover": {
                                                        background: "#94A3B8",
                                                    },
                                                },
                                            }}>
                                                {patientSummaryResponse?.recent_encounters?.map((encounter, index) => (
                                                    <Box key={index} sx={{
                                                        p: 1.5,
                                                        background: "linear-gradient(135deg,rgb(221, 202, 255) 0%,rgb(255, 255, 255) 100%)",
                                                        borderRadius: 2,
                                                        border: "1px solid #EDE9FE",
                                                        borderLeft: "3px solid #7C3AED",
                                                        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                                        transition: "all 0.2s ease",
                                                        "&:hover": {
                                                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                                            transform: "translateY(-1px)",
                                                        }
                                                    }}>
                                                        <Typography variant="body2" sx={{
                                                            fontSize: "13px",
                                                            fontWeight: "bold",
                                                            color: "#0F172A",
                                                            mb: 0.8,
                                                            fontFamily: "Poppins"
                                                        }}>
                                                            {encounter.encounter}
                                                        </Typography>
                                                        <Typography variant="body2"
                                                            sx={{
                                                                fontSize: "12px",
                                                                color: "#475569",
                                                                mb: 0.5,
                                                                fontFamily: "Poppins"
                                                            }}>
                                                            <strong style={{ color: "#64748B" }}>Date:</strong> {encounter.date}
                                                        </Typography>
                                                        <Typography variant="body2"
                                                            sx={{
                                                                fontSize: "12px",
                                                                color: "#475569",
                                                                mb: 0.5,
                                                                fontFamily: "Poppins"
                                                            }}>
                                                            <strong style={{ color: "#64748B" }}>Reason:</strong> {encounter.reason}
                                                        </Typography>
                                                        <Typography variant="body2"
                                                            sx={{
                                                                fontSize: "12px",
                                                                color: "#475569",
                                                                fontFamily: "Poppins"
                                                            }}>
                                                            <strong style={{ color: "#64748B" }}>Outcome:</strong> {encounter.outcome}
                                                        </Typography>
                                                    </Box>
                                                )) || <Typography>No recent encounters found</Typography>}
                                            </Box>
                                        </Paper>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Right Column - Medical Timeline */}
                            <Box sx={{
                                width: 400,
                                display: "flex",
                                flexDirection: "column",
                                height: "fit-content",
                                maxHeight: "700px"
                            }}>
                                <Paper
                                    sx={{
                                        borderRadius: 3,
                                        borderTop: "4px solid #1E88E5",
                                        backgroundColor: "background.paper",
                                        overflow: "hidden",
                                        height: "100%",
                                        maxHeight: "700px",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {/* Timeline Header with Month Selector */}
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderBottom: 1,
                                            borderColor: "divider",
                                            flexShrink: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px", color: "text.primary" }}>
                                            Medical Timeline
                                        </Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary" }}>
                                                September 2020
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Timeline Content */}
                                    <Box sx={{
                                        flex: 1,
                                        overflow: "auto",
                                        maxHeight: "600px" // Match the MedicalTimeline component
                                    }}>
                                        <MedicalTimeline
                                            patientId={patient._id} />
                                    </Box>
                                </Paper>
                            </Box>
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
                        {/* Trends Title */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "20px", color: "text.primary" }}>
                                Trends & Analytics - {patient.name.first} {patient.name.last}
                            </Typography>
                        </Box>

                        {/* All Graphs - 2 per row */}
                        <Box sx={{ flex: 1, overflow: "overflow-y", p: 1 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {Array.from({ length: Math.ceil(trendsData.length / 2) }, (_, rowIndex) => {
                                    const leftGraph = trendsData[rowIndex * 2];
                                    const rightGraph = trendsData[rowIndex * 2 + 1];

                                    return (
                                        <Box key={rowIndex} sx={{ display: "flex", width: "100%", gap: 2, minHeight: "400px" }}>
                                            {/* Left graph - 50% width */}
                                            <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
                                                <Paper sx={{
                                                    p: 3,
                                                    borderRadius: 3,
                                                    borderTop: "4px solid #1E88E5",
                                                    backgroundColor: "background.paper",
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}>
                                                    {/* Standardized Header */}
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        mb: 2,
                                                        pb: 2,
                                                        borderBottom: 1,
                                                        borderColor: 'divider'
                                                    }}>
                                                        <Typography variant="h6" sx={{
                                                            fontWeight: 'bold',
                                                            fontSize: "16px",
                                                            color: "text.primary",
                                                            flex: 1,
                                                            mr: 2
                                                        }}>
                                                            {leftGraph?.graph_name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{
                                                            fontSize: "12px",
                                                            lineHeight: 1.4,
                                                            textAlign: "left",
                                                            marginTop: 2
                                                        }}>
                                                            {leftGraph?.summary_of_day}
                                                        </Typography>
                                                    </Box>
                                                    {/* Chart Area */}
                                                    <Box sx={{
                                                        flex: 1,
                                                        minHeight: "320px",
                                                        width: "100%"
                                                    }}>
                                                        <PatientGraph
                                                            patient={patient}
                                                            specificGraph={leftGraph}
                                                            showKPI={false}
                                                        />
                                                    </Box>
                                                </Paper>
                                            </Box>

                                            {/* Right graph - 50% width */}
                                            <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
                                                {rightGraph ? (
                                                    <Paper sx={{
                                                        p: 3,
                                                        borderRadius: 3,
                                                        borderTop: "4px solid #1E88E5",
                                                        backgroundColor: "background.paper",
                                                        height: "100%",
                                                        display: "flex",
                                                        flexDirection: "column"
                                                    }}>
                                                        {/* Standardized Header */}
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-between',
                                                            mb: 2,
                                                            pb: 2,
                                                            borderBottom: 1,
                                                            borderColor: 'divider'
                                                        }}>
                                                            <Typography variant="h6" sx={{
                                                                fontWeight: 'bold',
                                                                fontSize: "16px",
                                                                color: "text.primary",
                                                                flex: 1,
                                                                mr: 2
                                                            }}>
                                                                {rightGraph.graph_name}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary" sx={{
                                                                fontSize: "12px",
                                                                lineHeight: 1.4,
                                                                textAlign: "left",
                                                                marginTop: 2
                                                            }}>
                                                                {rightGraph.summary_of_day}
                                                            </Typography>
                                                        </Box>
                                                        {/* Chart Area */}
                                                        <Box sx={{
                                                            flex: 1,
                                                            minHeight: "320px",
                                                            width: "100%"
                                                        }}>
                                                            <PatientGraph
                                                                patient={patient}
                                                                specificGraph={rightGraph}
                                                                showKPI={false}
                                                            />
                                                        </Box>
                                                    </Paper>
                                                ) : (
                                                    <Box sx={{ width: "100%", height: "400px" }} />
                                                )}
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Box>
                )}

                {tabValue === "signals" && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
                        {/* Health Signals Header */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "20px" }}>
                                Health Signals - {patient.name.first} {patient.name.last}
                            </Typography>
                        </Box>

                        {/* Health Signals Content */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {/* Current Status */}
                            <Paper sx={{
                                p: 2,
                                borderRadius: 3,
                                borderTop: "4px solid #1E88E5",
                                backgroundColor: "background.paper"
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}>
                                    Current Status
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: "14px", lineHeight: 1.6, color: "text.secondary" }}>
                                    {healthSignalResponse?.current_status || "No status available"}
                                </Typography>
                            </Paper>

                            {/* Risk Scores */}
                            <Paper sx={{
                                p: 2,
                                borderRadius: 3,
                                borderTop: "4px solid #F59E0B",
                                backgroundColor: "background.paper"
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1.5, color: "text.primary" }}>
                                    Risk Scores
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                    <Chip
                                        label={`Readmission: ${healthSignalResponse?.risk_scores?.readmission_risk || "Low"}`}
                                        color="success"
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 2,
                                            fontWeight: "bold",
                                            flex: "1 1 160px",
                                            minHeight: 36
                                        }}
                                    />
                                    <Chip
                                        label={`Mortality: ${healthSignalResponse?.risk_scores?.mortality_risk || "Low"}`}
                                        color="error"
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 2,
                                            fontWeight: "bold",
                                            flex: "1 1 160px",
                                            minHeight: 36
                                        }}
                                    />
                                    {healthSignalResponse?.risk_scores?.other_risks?.length > 0 && (
                                        <Chip
                                            label={`Other: ${healthSignalResponse.risk_scores.other_risks.join(", ")}`}
                                            color="primary"
                                            variant="outlined"
                                            sx={{
                                                borderRadius: 2,
                                                fontWeight: "bold",
                                                flex: "1 1 160px",
                                                minHeight: 36
                                            }}
                                        />
                                    )}
                                </Box>
                            </Paper>

                            {/* Contributing Factors */}
                            <Paper sx={{
                                p: 2,
                                borderRadius: 3,
                                borderTop: "4px solid #22C55E",
                                backgroundColor: "background.paper"
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1.5, color: "text.primary" }}>
                                    Contributing Factors
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    {healthSignalResponse?.contributing_factors?.map((factor, index) => (
                                        <Box key={index} sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1
                                        }}>
                                            <Box sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                bgcolor: "success.main",
                                                flexShrink: 0
                                            }} />
                                            <Typography variant="body2" sx={{ fontSize: "14px", color: "text.secondary" }}>
                                                {factor}
                                            </Typography>
                                        </Box>
                                    )) || <Typography color="text.secondary">No contributing factors found</Typography>}
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                )}

                {/* Chatbot Panel */}
                <Box sx={{ display: "flex", height: "100vh", background: "transparent" }}>
                    <Chatbot patientId={patient._id} />
                </Box>
            </Box>
        </Box>
    );
}
