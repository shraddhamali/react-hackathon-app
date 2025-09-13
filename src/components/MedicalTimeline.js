// components/MedicalTimeline.js

import React from "react";
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

const data = [
    {
        date: "2015-03-10",
        category: "procedure",
        title: "Dilation and curettage",
        details: "For postmenopausal bleeding; prior simple endometrial hyperplasia without atypia."
    },
    {
        date: "2017-01-30",
        category: "imaging",
        title: "Tdap immunization",
        details: "Tdap (Adacel) administered."
    },
    {
        date: "2020-06-23",
        category: "immunization",
        title: "Zoster (Shingrix)",
        details: "Dose 1 administered; dose 2 on 2020-10-20."
    },
    {
        date: "2021-11-10",
        category: "lab",
        title: "Lipid panel and CMP/CBC",
        details: "Total cholesterol 210 mg/dL (H), LDL 143 mg/dL (H), glucose 106 mg/dL (H), BUN 23 mg/dL (H), creatinine 0.86 mg/dL, eGFR 71, Hgb 13.2 g/dL."
    },
    {
        date: "2021-11-17",
        category: "immunization",
        title: "Pfizer COVID-19 booster",
        details: "Bivalent booster (external source)."
    },
    {
        date: "2022-01-27",
        category: "encounter",
        title: "GYN visit – Bacterial vaginosis",
        details: "Complaints of fishy vaginal discharge; exam consistent with BV; prescribed metronidazole 0.75% vaginal gel nightly x7 days."
    },
    {
        date: "2022-02-03",
        category: "encounter",
        title: "Primary care visit – HTN follow-up",
        details: "BP 123/74; chronic low back pain; GERD; ordered H. pylori breath test and A1c; prescribed ibuprofen 600 mg PRN; Pneumovax 23 given."
    },
    {
        date: "2022-02-03",
        category: "lab",
        title: "Hemoglobin A1c",
        details: "A1c 5.5%."
    },
    {
        date: "2022-02-06",
        category: "lab",
        title: "H. pylori urea breath test",
        details: "Not detected."
    },
    {
        date: "2022-02-14",
        category: "imaging",
        title: "DEXA bone density",
        details: "Lumbar spine T-score -1.2 (osteopenic); total hip 0.7; femoral neck -0.4; FRAX major 3.5%, hip 0.1%."
    },
    {
        date: "2022-03-05",
        category: "note",
        title: "Telephone encounter",
        details: "Patient informed she does not have osteoporosis."
    },
    {
        date: "2022-04-19",
        category: "immunization",
        title: "Pfizer SARS-CoV-2 (tris-sucrose)",
        details: "COVID-19 vaccine administered."
    },
    {
        date: "2022-12-12",
        category: "immunization",
        title: "PCV13 (Prevnar 13)",
        details: "Pneumococcal conjugate vaccine administered."
    },
    {
        date: "2022-12-16",
        category: "imaging",
        title: "Screening mammogram",
        details: "BI-RADS 1 (negative); almost entirely fatty breasts; no suspicious findings."
    },
    {
        date: "2022-11-28",
        category: "medication",
        title: "Medication renewals",
        details: "Olmesartan 40 mg daily; gabapentin 100 mg nightly."
    }
];

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

export default function MedicalTimeline() {
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
                            left: 15,
                            top: 0,
                            bottom: 0,
                            width: 2,
                            backgroundColor: "#e0e0e0",
                        }}
                    />

                    {data.map((item, index) => {
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
                                        mb: 1.5,
                                        pl: 4,
                                        pr: 1,
                                    }}
                                >
                                    {/* Timeline Icon */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            left: 8,
                                            top: 6,
                                            width: 14,
                                            height: 14,
                                            borderRadius: "50%",
                                            backgroundColor: "#fff",
                                            border: `2px solid ${color}`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            zIndex: 2,
                                        }}
                                    >
                                        <Box sx={{ color: color, fontSize: "6px" }}>
                                            {categoryIcons[item.category] || <FaUserMd />}
                                        </Box>
                                    </Box>

                                    {/* Content Card */}
                                    <Box
                                        sx={{
                                            backgroundColor: color,
                                            color: "#fff",
                                            padding: "4px 8px",
                                            borderRadius: 1.5,
                                            minHeight: "35px",
                                            width: "100%",
                                            position: "relative",
                                            wordWrap: "break-word",
                                            overflow: "hidden",
                                            "&::before": {
                                                content: '""',
                                                position: "absolute",
                                                left: -4,
                                                top: 8,
                                                width: 0,
                                                height: 0,
                                                borderTop: "4px solid transparent",
                                                borderBottom: "4px solid transparent",
                                                borderRight: `4px solid ${color}`,
                                            },
                                        }}
                                    >
                                        <Box sx={{ fontSize: "10px", fontWeight: "600", mb: 0.2, lineHeight: 1.1 }}>
                                            {item.title.length > 25 ? item.title.substring(0, 25) + "..." : item.title}
                                        </Box>
                                        <Box sx={{ fontSize: "8px", opacity: 0.9, lineHeight: 1.1, mb: 0.2 }}>
                                            {item.details.length > 40 ? item.details.substring(0, 40) + "..." : item.details}
                                        </Box>
                                        <Box sx={{ fontSize: "7px", opacity: 0.8 }}>
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
