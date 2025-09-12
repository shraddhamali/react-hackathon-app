// components/MedicalTimeline.js

import React from "react";
import {motion} from "framer-motion";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
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
    procedure: <FaUserMd/>,
    imaging: <FaXRay/>,
    immunization: <FaSyringe/>,
    lab: <FaVials/>,
    encounter: <FaHeartbeat/>,
    note: <FaNotesMedical/>,
    medication: <FaPills/>,
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
    hidden: {opacity: 0, x: 50},
    visible: {opacity: 1, x: 0, transition: {duration: 0.6, ease: "easeOut"}},
};

export default function MedicalTimeline() {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 16,
                right: 16,
                width: 400,
                height: 600,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                zIndex: 1000,
            }}
        >
            {/* Sticky Header */}
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    bgcolor: "background.paper",
                    borderBottom: 1,
                    borderColor: "divider",
                    p: 1,
                    textAlign: "center",
                    fontWeight: "bold",
                    zIndex: 10,
                }}
            >
                Medical Timeline
            </Box>

            {/* Scrollable Content */}
            <Box sx={{flex: 1, overflowY: "auto", p: 1}}>
                <VerticalTimeline layout="1-column-left">
                    {data.map((item, index) => {
                        const color = categoryColors[item.category] || "#007bff";
                        return (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{once: true, amount: 0.3}}
                                variants={timelineVariants}
                            >
                                <VerticalTimelineElement
                                    date={item.date}
                                    contentStyle={{
                                        background: color,
                                        color: "#fff",
                                        padding: "6px 10px",
                                        fontSize: "12px",
                                        minHeight: "80px",
                                    }}
                                    contentArrowStyle={{
                                        borderRight: `5px solid ${color}`,
                                    }}
                                    iconStyle={{
                                        background: "#fff",
                                        border: `3px solid ${color}`,
                                        color: color,
                                        boxShadow: "none",
                                    }}
                                    icon={categoryIcons[item.category] || <FaUserMd/>}
                                >
                                    <Box sx={{m: 0, fontSize: "14px", fontWeight: "600"}}>
                                        {item.title}
                                    </Box>
                                    <Box sx={{mt: 0.5, fontSize: "12px"}}>
                                        {item.details}
                                    </Box>
                                </VerticalTimelineElement>
                            </motion.div>
                        );
                    })}
                </VerticalTimeline>
            </Box>
        </Box>

    );
}
