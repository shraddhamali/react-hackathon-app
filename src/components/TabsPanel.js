import React from "react";
import {Tabs, Tab, Box, Typography, Paper, Divider} from "@mui/material";
import MedicalTimeline from "./MedicalTimeline";

export default function TabsPanel({patient}) {
    const [tabValue, setTabValue] = React.useState("summary");

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{display: "flex", height: "100vh", background: "#f8f9fa"}}>
            {/* Left Vertical Tabs */}
            <Box
                sx={{
                    width: 240,
                    bgcolor: "background.paper",
                    borderRight: 1,
                    borderColor: "divider",
                }}
            >
                <Tabs
                    orientation="vertical"
                    value={tabValue}
                    onChange={handleTabChange}
                >
                    <Tab value="summary" label="Patient Summary"/>
                    <Tab value="trends" label="Trends"/>
                    <Tab value="signals" label="Health Signals"/>
                </Tabs>
            </Box>

            {/* Main content area */}
            <Box sx={{flex: 1, p: 3, position: "relative"}}>
                {tabValue === "summary" && (
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            boxShadow: 3,
                            maxWidth: 1000,      // control width
                            ml: 2,              // small left margin (space from tabs)
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Patient Summary
                        </Typography>
                        <Divider sx={{mb: 2}}/>

                        <Typography variant="body1">
                            <b>MRN:</b> {patient.patient_id}
                        </Typography>
                        <Typography variant="body1">
                            <b>Name:</b> {patient.name.first} {patient.name.last}
                        </Typography>
                        <Typography variant="body1">
                            <b>DOB:</b> {new Date(patient.dob).toLocaleDateString("en-US")}
                        </Typography>
                        <Typography variant="body1">
                            <b>Sex:</b> {patient.sex}
                        </Typography>
                        <Typography variant="body1">
                            <b>Age:</b> {patient.age}
                        </Typography>

                        <Divider sx={{my: 2}}/>

                        <Typography variant="body1">
                            <b>Contact:</b> {patient.contact.phone}
                            {patient.contact.email && ` | ${patient.contact.email}`}
                        </Typography>

                        <Typography variant="body1">
                            <b>Address:</b> {patient.address.line1}, {patient.address.city},{" "}
                            {patient.address.state} {patient.address.zip}
                        </Typography>
                    </Paper>
                )}

                {tabValue === "trends" && (
                    <Paper sx={{p: 3, borderRadius: 3, boxShadow: 3}}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Trends
                        </Typography>
                        <Divider sx={{mb: 2}}/>
                        <Typography>Charts, graphs, etc...</Typography>
                    </Paper>
                )}

                {tabValue === "signals" && (
                    <Paper sx={{p: 3, borderRadius: 3, boxShadow: 3}}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Health Signals
                        </Typography>
                        <Divider sx={{mb: 2}}/>
                        <Typography>Alerts, warnings, etc...</Typography>
                    </Paper>
                )}
            </Box>

            {/* Fixed Medical Timeline */}
            <MedicalTimeline/>
        </Box>
    );
}
