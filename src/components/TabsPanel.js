import React, { useEffect, useState } from "react";
import { Box, Divider, Paper, Tab, Tabs, Typography } from "@mui/material";
import MedicalTimeline from "./MedicalTimeline";
import PatientGraph from "./PatientGraph";
import Chatbot from "./chatbot";

export default function TabsPanel({ patient }) {
    const [tabValue, setTabValue] = React.useState("summary");
    const mainContentRef = React.useRef(null);

    const [patientSummaryResponse, setPatientSummary] = useState([]);

    const [healthSignalResponse, setHealthSignal] = useState([]);


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

        }
    }, [patient]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };



    return (
        <Box sx={{ display: "flex", height: "100vh", background: "white" }}>
            {/* Left Vertical Tabs */}
            <Box
                sx={{
                    width: 240,
                    bgcolor: "white",
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
                        label="Patient Summary"
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
                    transition: "all 0.3s ease-in-out",
                    backgroundColor: "white"
                }}
            >
                {tabValue === "summary" && (
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                        height: "100%",
                        minHeight: "100vh"
                    }}>
                        {/* Left side - Patient Data and Summary */}
                        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minHeight: "100%" }}>
                            {/* Overview Section */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1, color: "#2c3e50" }}>
                                    Patient Overview
                                </Typography>
                                <Typography variant="body1" sx={{ color: "#666", fontSize: "16px" }}>
                                    Comprehensive view of patient information, medical history, and current health
                                    status.
                                </Typography>
                            </Box>

                            {/* Patient Data in One Line */}
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
                                        background: "#fafafa",
                                        border: "1px solid #dee2e6"
                                    }}
                                >
                                    <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                        <b>MRN:</b> {patient.patient_id}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                        <b>Name:</b> {patient.name.first} {patient.name.last}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                      <b>DOB:</b>{" "}
                                      {patient.dob ? new Date(patient.dob).toLocaleDateString("en-US") : ""}
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
                                     <b>Address:</b>{" "}
                                     {[
                                       patient.address?.line1,
                                       patient.address?.city,
                                       patient.address?.state,
                                       patient.address?.zip,
                                     ]
                                       .filter(Boolean) // removes empty/null/undefined
                                       .join(", ")}
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
                                    background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
                                    border: "1px solid #a5d6a7"
                                }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#2e7d32" }}>
                                        📋 Patient Summary
                                    </Typography>
                                    <Typography variant="body2"
                                        sx={{ fontSize: "14px", lineHeight: 1.6, color: "#424242" }}>
                                        {patientSummaryResponse?.one_liner || "No summary available"}
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
                                        background: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
                                        border: "1px solid #ef9a9a"
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#c62828" }}>
                                            🚨 Top Problems
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
                                        boxShadow: 3,
                                        flex: 1,
                                        background: "linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%)",
                                        border: "1px solid #ffb74d"
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#ef6c00" }}>
                                            ⚠️ Allergies
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
                                        boxShadow: 3,
                                        flex: 1,
                                        background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
                                        border: "1px solid #a5d6a7"
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#2e7d32" }}>
                                            💊 Medications
                                        </Typography>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 0.8,
                                            maxHeight: "200px",
                                            overflowY: "auto"
                                        }}>
                                            {patientSummaryResponse?.medications?.map((med, index) => (
                                                <Box key={index} sx={{
                                                    p: 1.5,
                                                    background: "linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%)",
                                                    borderRadius: 2,
                                                    border: "1px solid #c8e6c9",
                                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
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
                                                            color: "#1b5e20"
                                                        }}>
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
                                                    <Typography variant="body2"
                                                        sx={{ fontSize: "12px", color: "#424242", mb: 0.3 }}>
                                                        {med.dosage}
                                                    </Typography>
                                                    <Typography variant="body2"
                                                        sx={{ fontSize: "11px", color: "#666666" }}>
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
                                        boxShadow: 3,
                                        flex: 1,
                                        background: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
                                        border: "1px solid #ce93d8"
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#7b1fa2" }}>
                                            🏥 Recent Encounters
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                                            {patientSummaryResponse?.recent_encounters?.map((encounter, index) => (
                                                <Box key={index} sx={{
                                                    p: 1.5,
                                                    background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)",
                                                    borderRadius: 2,
                                                    border: "1px solid #f8bbd9",
                                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                                                }}>
                                                    <Typography variant="body2" sx={{
                                                        fontSize: "12px",
                                                        fontWeight: "bold",
                                                        color: "#4a148c",
                                                        mb: 0.3
                                                    }}>
                                                        {encounter.encounter}
                                                    </Typography>
                                                    <Typography variant="body2"
                                                        sx={{ fontSize: "11px", color: "#424242", mb: 0.3 }}>
                                                        <strong>Date:</strong> {encounter.date}
                                                    </Typography>
                                                    <Typography variant="body2"
                                                        sx={{ fontSize: "11px", color: "#424242", mb: 0.3 }}>
                                                        <strong>Reason:</strong> {encounter.reason}
                                                    </Typography>
                                                    <Typography variant="body2"
                                                        sx={{ fontSize: "11px", color: "#424242" }}>
                                                        <strong>Outcome:</strong> {encounter.outcome}
                                                    </Typography>
                                                </Box>
                                            )) || <Typography>No recent encounters found</Typography>}
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
                            minHeight: "120vh"
                        }}>
                            <Paper
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    overflow: "hidden",
                                    height: "100%",
                                    minHeight: "120vh",
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
                                    minHeight: "calc(120vh - 80px)"
                                }}>
                                    <MedicalTimeline
                                        patientId={patient._id} />
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
                                boxShadow: 3,
                                background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
                                border: "1px solid #bbdefb"
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#1565c0" }}>
                                    🩺 Current Status
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: "14px", lineHeight: 1.6, color: "#424242" }}>
                                    {healthSignalResponse?.current_status || "No status available"}
                                </Typography>
                            </Paper>

                            {/* Risk Scores */}
                            <Paper sx={{
                                p: 2,
                                borderRadius: 3,
                                boxShadow: 3,
                                background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
                                border: "1px solid #ffcc80"
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#ef6c00" }}>
                                    ⚠️ Risk Scores
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                    <Paper sx={{
                                        px: 2, py: 1, borderRadius: 2, bgcolor: "#c8e6c9",
                                        color: "#1b5e20", fontWeight: "bold", flex: "1 1 120px", textAlign: "center"
                                    }}>
                                        Readmission Risk: {healthSignalResponse?.risk_scores?.readmission_risk || "-"}
                                    </Paper>
                                    <Paper sx={{
                                        px: 2, py: 1, borderRadius: 2, bgcolor: "#ffcdd2",
                                        color: "#c62828", fontWeight: "bold", flex: "1 1 120px", textAlign: "center"
                                    }}>
                                        Mortality Risk: {healthSignalResponse?.risk_scores?.mortality_risk || "-"}
                                    </Paper>
                                    {patientSummaryResponse?.status_and_risk_factors?.risk_scores?.other_risks?.length > 0 &&
                                        <Paper sx={{
                                            px: 2, py: 1, borderRadius: 2, bgcolor: "#bbdefb",
                                            color: "#1565c0", fontWeight: "bold", flex: "1 1 120px", textAlign: "center"
                                        }}>
                                            Other Risks: {healthSignalResponse?.risk_scores.other_risks.join(", ")}
                                        </Paper>
                                    }
                                </Box>
                            </Paper>

                            {/* Contributing Factors */}
                            <Paper sx={{
                                p: 2,
                                borderRadius: 3,
                                boxShadow: 3,
                                background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
                                border: "1px solid #a5d6a7"
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#2e7d32" }}>
                                    🔍 Contributing Factors
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
                                                bgcolor: "#66bb6a",
                                                flexShrink: 0
                                            }} />
                                            <Typography variant="body2" sx={{ fontSize: "14px", color: "#424242" }}>
                                                {factor}
                                            </Typography>
                                        </Box>
                                    )) || <Typography>No contributing factors found</Typography>}
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                )}
            </Box>
            <Box sx={{ display: "flex", height: "100vh", background: "#f8f9fa" }}>
                <Chatbot
                    patientId={patient._id} />
            </Box>
        </Box>
    );
}
