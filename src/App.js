// App.js
import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PatientTable from "./components/PatientTable";
import TabsPanel from "./components/TabsPanel";
import Login from "./components/Login";

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
                            {!selectedPatient ? (
                                // Show Table First
                                <PatientTable onRowClick={(patient) => setSelectedPatient(patient)} />
                            ) : (
                                // Show Tabs + Timeline when patient is selected
                                <TabsPanel
                                    patient={selectedPatient}
                                    onBackToTable={() => setSelectedPatient(null)}
                                />
                            )}
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
