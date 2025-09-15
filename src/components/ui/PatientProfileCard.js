import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Avatar,
    Chip,
    AvatarGroup,
    Button,
    Divider
} from '@mui/material';
import {
    Phone,
    Email,
    LocationOn,
    History,
    Payment
} from '@mui/icons-material';

function PatientProfileCard({ patient, patientVitals }) {

    const getPatientInitials = () => {
        if (patient?.name?.first && patient?.name?.last) {
            return `${patient.name.first[0]}${patient.name.last[0]}`;
        }
        return 'P';
    };

    const getStatusColor = () => {
        const stability = patientVitals?.stability?.toLowerCase();

        console.log(patientVitals);

        if (!stability) return "default"; // fallback

        if (stability.includes("high risk")) return "error";   // 🔴 red
        if (stability.includes("stable")) return "success";    // 🟢 green
        if (stability.includes("improvement")) return "warning"; // 🟡 yellow

        return "default"; // grey if nothing matches
    };

    console.log(patientVitals)

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                borderTop: "4px solid #1E88E5",
                backgroundColor: "background.paper",
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            {/* Header with Avatar and Name */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                    sx={{
                        width: 64,
                        height: 64,
                        backgroundColor: 'primary.main',
                        fontSize: '24px',
                        fontWeight: 'bold',
                    }}
                >
                    {getPatientInitials()}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 0.5 }}>
                        {patient?.name?.first} {patient?.name?.last}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Age: {patient?.age || 'N/A'}
                        </Typography>
                        <Chip
                            label={patientVitals?.stability || "--"}
                            size="small"
                            color={getStatusColor()}
                            sx={{ fontSize: '11px', height: 22 }}
                        />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        MRN: {patient?.patient_id}
                    </Typography>
                </Box>
            </Box>

            <Divider />

            {/* Vitals Section */}
            <Box>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 1.5, color: "text.primary" }}
                >
                    Quick Vitals
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {/* Blood Type */}
                    <Box sx={{ flex: "1 1 120px" }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ textTransform: "uppercase", fontSize: "10px" }}
                        >
                            Blood Type
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                        >
                            {patientVitals?.blood_type || "--"}
                        </Typography>
                    </Box>

                    {/* Height */}
                    <Box sx={{ flex: "1 1 120px" }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ textTransform: "uppercase", fontSize: "10px" }}
                        >
                            Height
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                        >
                            {patientVitals?.height || "--"}
                        </Typography>
                    </Box>

                    {/* Weight */}
                    <Box sx={{ flex: "1 1 120px" }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ textTransform: "uppercase", fontSize: "10px" }}
                        >
                            Weight
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                        >
                            {patientVitals?.weight || "--"}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Divider />

            {/* Contact Information */}
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1.5, color: 'text.primary' }}>
                    Contact
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {patient?.contact?.phone || 'N/A'}
                        </Typography>
                    </Box>
                    {patient?.contact?.email && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                {patient.contact.email}
                            </Typography>
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mt: 0.2 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                            {[
                                patient?.address?.line1,
                                patient?.address?.city,
                                patient?.address?.state,
                                patient?.address?.zip,
                            ]
                                .filter(Boolean)
                                .join(', ') || 'N/A'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}

export default PatientProfileCard;
