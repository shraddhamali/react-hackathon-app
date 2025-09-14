
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

// Map categories to colors
const categoryColors = {
    procedure: "#e74c3c",    // red
    imaging: "#9b59b6",      // purple
    immunization: "#f39c12", // orange
    lab: "#27ae60",          // green
    encounter: "#2980b9",    // blue
    note: "#16a085",         // teal
    medication: "#8e44ad",   // violet
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
            <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", p: 1 }}>
                <Box sx={{ position: "relative" }}>
                    {/* Timeline Line */}
                    <Box
                        sx={{
                            position: "absolute",
                            left: 16,
                            top: 0,
                            bottom: 0,
                            width: 2,
                            backgroundColor: "#e0e0e0",
                        }}
                    />

                    {timelineData.map((item, index) => {
                        const color = categoryColors[item.category] || "#007bff";
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
                                        mb: 2,
                                        pl: 5,
                                        pr: 1,
                                    }}
                                >
                                    {/* Timeline Icon */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            left: 2,
                                            top: 4,
                                            width: 30,
                                            height: 30,
                                            borderRadius: "50%",
                                            backgroundColor: "#fff",
                                            border: `2px solid ${color}`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            zIndex: 2,
                                        }}
                                    >
                                        <Box sx={{ color: color, fontSize: "20px" }}>
                                            {categoryIcons[item.category] || <FaUserMd />}
                                        </Box>
                                    </Box>

                                    {/* Content Card */}
                                    <Box
                                        sx={{
                                            backgroundColor: color,
                                            color: "#fff",
                                            padding: "6px 10px",
                                            borderRadius: 1.5,
                                            minHeight: "50px",
                                            width: "100%",
                                            position: "relative",
                                            wordWrap: "break-word",
                                            overflow: "hidden",
                                            "&::before": {
                                                content: '""',
                                                position: "absolute",
                                                left: -4,
                                                top: 10,
                                                width: 0,
                                                height: 0,
                                                borderTop: "4px solid transparent",
                                                borderBottom: "4px solid transparent",
                                                borderRight: `4px solid ${color}`,
                                            },
                                        }}
                                    >
                                        <Box sx={{ fontSize: "14px", fontWeight: "600", mb: 0.4, lineHeight: 1.3 }}>
                                            {item.title.length > 30 ? item.title.substring(0, 30) + "..." : item.title}
                                        </Box>
                                        <Box sx={{ fontSize: "12px", opacity: 0.9, lineHeight: 1.3, mb: 0.4 }}>
                                            {item.details.length > 50 ? item.details.substring(0, 50) + "..." : item.details}
                                        </Box>
                                        <Box sx={{ fontSize: "11px", opacity: 0.8 }}>
                                            {item.date}
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
