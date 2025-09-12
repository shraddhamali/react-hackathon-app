import React from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Box
} from "@mui/material";

export default function PatientTable({ onRowClick }) {
    const patients = [
        {
            patient_id: "01714983",
            name: { first: "Maria Blanca", last: "Alfaro" },
            dob: "1956-12-06",
            sex: "F",
            age: 68,
            contact: { phone: "510-223-8761", email: null },
            address: {
                line1: "348 HANOVER ST",
                city: "SAN FRANCISCO",
                state: "CA",
                zip: "94112",
            },
        },
        {
            patient_id: "01876244",
            name: { first: "John", last: "Doe" },
            dob: "1970-04-15",
            sex: "M",
            age: 54,
            contact: { phone: "415-555-1234", email: "johndoe@example.com" },
            address: {
                line1: "124 MARKET ST",
                city: "OAKLAND",
                state: "CA",
                zip: "94607",
            },
        },
        {
            patient_id: "01984322",
            name: { first: "Alice", last: "Johnson" },
            dob: "1985-09-23",
            sex: "F",
            age: 39,
            contact: { phone: "650-555-8765", email: "alice.j@example.com" },
            address: {
                line1: "789 PINE AVE",
                city: "SAN JOSE",
                state: "CA",
                zip: "95112",
            },
        },
        {
            patient_id: "02014567",
            name: { first: "Robert", last: "Lee" },
            dob: "1992-01-10",
            sex: "M",
            age: 33,
            contact: { phone: "510-987-6543", email: null },
            address: {
                line1: "456 BROADWAY ST",
                city: "BERKELEY",
                state: "CA",
                zip: "94704",
            },
        },
    ];

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <TableContainer
                component={Paper}
                sx={{
                    width: "90%",
                    borderRadius: 3,
                    boxShadow: 4,
                }}
            >
                {/* Header */}
                <Typography
                    variant="h6"
                    sx={{
                        p: 2,
                        fontWeight: "bold",
                        borderBottom: "1px solid #ddd",
                        backgroundColor: "#f1f3f6",
                    }}
                >
                    Patient Demographics
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#fafafa" }}>
                            <TableCell><b>MRN</b></TableCell>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>DOB</b></TableCell>
                            <TableCell><b>Sex</b></TableCell>
                            <TableCell><b>Age</b></TableCell>
                            <TableCell><b>Contact</b></TableCell>
                            <TableCell><b>Address</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow
                                key={patient.patient_id}
                                hover
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { backgroundColor: "#e3f2fd" },
                                }}
                                onClick={() => onRowClick(patient)}
                            >
                                <TableCell>{patient.patient_id}</TableCell>
                                <TableCell>{`${patient.name.first} ${patient.name.last}`}</TableCell>
                                <TableCell>
                                    {new Date(patient.dob).toLocaleDateString("en-US")}
                                </TableCell>
                                <TableCell>{patient.sex}</TableCell>
                                <TableCell>{patient.age}</TableCell>
                                <TableCell>
                                    {patient.contact.phone}
                                    {patient.contact.email && (
                                        <>
                                            <br />
                                            <a href={`mailto:${patient.contact.email}`}>
                                                {patient.contact.email}
                                            </a>
                                        </>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {`${patient.address.line1}, ${patient.address.city}, ${patient.address.state} ${patient.address.zip}`}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
