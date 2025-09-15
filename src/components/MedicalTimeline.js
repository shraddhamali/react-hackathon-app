
import { motion } from "framer-motion";
import {
    FaHeartbeat,
    FaUserMd,
    FaSyringe,
    FaVials,
    FaNotesMedical,
    FaPills,
    FaXRay,
} from "react-icons/fa";
import "./MedicalTimeline.css";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

// Map categories to icons
const categoryIcons = {
    procedure: <FaUserMd />,
    imaging: <FaXRay />,
    immunization: <FaSyringe />,
    lab: <FaVials />,
    encounter: <FaHeartbeat />,
    note: <FaNotesMedical />,
    medication: <FaPills />,
};

// Map categories to muted colors that align with our theme
const categoryColors = {
    procedure: "#EF4444",    // Muted red
    imaging: "#7C3AED",      // Muted purple/violet  
    immunization: "#F59E0B", // Muted orange
    lab: "#22C55E",          // Muted green
    encounter: "#1E88E5",    // Muted blue (primary)
    note: "#06B6D4",         // Muted cyan
    medication: "#8B5CF6",   // Muted violet
};

// Map categories to soft background colors
const categorySoftColors = {
    procedure: "#FEE2E2",    // Soft red
    imaging: "#EDE9FE",      // Soft purple/violet
    immunization: "#FEF3C7", // Soft orange  
    lab: "#DCFCE7",          // Soft green
    encounter: "#E3F2FD",    // Soft blue
    note: "#CFFAFE",         // Soft cyan
    medication: "#EDE9FE",   // Soft violet
};

const timelineVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function MedicalTimeline({ patientId }) {

    const [timelineData, setTimelineData] = useState([]);

    useEffect(() => {
        // Load patientData from localStorage
        const storedData = localStorage.getItem("patientData");
        if (storedData) {
            const patients = JSON.parse(storedData).patients || [];

            const patient = patients.find((p) => p._id === patientId);

            if (patient && patient.ai_response && patient.ai_response.patient_timeline) {
                setTimelineData(patient.ai_response.patient_timeline);
            }
        }
    }, [patientId]);

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Scrollable Content */}
            <Box
                className="medical-timeline-content"
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    p: 3,
                    maxHeight: "600px", // Constrain height to show ~4-5 timeline items
                }}
            >
                <Box sx={{ position: "relative" }}>
                    {/* Timeline Line */}
                    <Box
                        sx={{
                            position: "absolute",
                            left: 20,
                            top: 0,
                            bottom: 0,
                            width: 2,
                            backgroundColor: "#E5E7EB", // More muted gray
                        }}
                    />

                    {timelineData.map((item, index) => {
                        const color = categoryColors[item.category] || "#1E88E5";
                        const softColor = categorySoftColors[item.category] || "#E3F2FD";
                        return (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={timelineVariants}
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "flex-start",
                                        mb: 3,
                                        pl: 7,
                                        pr: 2,
                                    }}
                                >
                                    {/* Timeline Icon */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            left: 6,
                                            top: 8,
                                            width: 32,
                                            height: 32,
                                            borderRadius: "50%",
                                            backgroundColor: softColor,
                                            border: `2px solid ${color}`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            zIndex: 2,
                                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <Box sx={{ color: color, fontSize: "16px", alignItems: "center", justifyContent: "center" }}>
                                            {categoryIcons[item.category] || <FaUserMd />}
                                        </Box>
                                    </Box>

                                    {/* Content Card */}
                                    <Box
                                        sx={{
                                            backgroundColor: "#FFFFFF",
                                            color: "#0F172A",
                                            padding: "16px 20px",
                                            borderRadius: 3,
                                            minHeight: "auto",
                                            width: "100%",
                                            position: "relative",
                                            wordWrap: "break-word",
                                            border: `1px solid ${softColor}`,
                                            borderLeft: `4px solid ${color}`,
                                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                                transform: "translateY(-1px)",
                                            },
                                        }}
                                    >
                                        {/* Title */}
                                        <Box sx={{
                                            fontSize: "15px",
                                            fontWeight: 700,
                                            mb: 1,
                                            lineHeight: 1.4,
                                            color: "#0F172A",
                                            fontFamily: "Poppins"
                                        }}>
                                            {item.title.length > 35 ? item.title.substring(0, 35) + "..." : item.title}
                                        </Box>

                                        {/* Details */}
                                        <Box sx={{
                                            fontSize: "13px",
                                            lineHeight: 1.5,
                                            mb: 2,
                                            color: "#475569",
                                            fontFamily: "Poppins",
                                            fontWeight: 400
                                        }}>
                                            {item.details.length > 65 ? item.details.substring(0, 65) + "..." : item.details}
                                        </Box>

                                        {/* Date and Category */}
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            pt: 1,
                                            borderTop: "1px solid #F1F5F9"
                                        }}>
                                            <Box sx={{
                                                fontSize: "12px",
                                                color: "#64748B",
                                                fontFamily: "Poppins",
                                                fontWeight: 500
                                            }}>
                                                {item.date}
                                            </Box>
                                            <Box sx={{
                                                fontSize: "11px",
                                                fontWeight: 600,
                                                color: color,
                                                backgroundColor: softColor,
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: 2,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.5px",
                                                fontFamily: "Poppins"
                                            }}>
                                                {item.category}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </motion.div>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
}
