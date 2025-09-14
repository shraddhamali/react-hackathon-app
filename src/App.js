// App.js
import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import PatientTable from "./components/PatientTable";
import TabsPanel from "./components/TabsPanel";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function RequireAuth({ children }) {
    const location = useLocation();
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

function App() {
    const [selectedPatient, setSelectedPatient] = useState(null);

    return (
        <div style={{ height: "100vh", background: "#f8f9fa" }}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                                <Navbar
                                    showBackButton={!!selectedPatient}
                                    onBackClick={() => setSelectedPatient(null)}
                                    title={selectedPatient ? "Patient Details" : ""}
                                />
                                <Box sx={{ flexGrow: 1, pt: 8 }}>
                                    {!selectedPatient ? (
                                        // Show Table First
                                        <PatientTable onRowClick={(patient) => setSelectedPatient(patient)} />
                                    ) : (
                                        // Show Tabs + Timeline when patient is selected
                                        <TabsPanel
                                            patient={selectedPatient}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
