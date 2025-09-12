// App.js
import React, { useState } from "react";
import PatientTable from "./components/PatientTable";
import TabsPanel from "./components/TabsPanel";

function App() {
    const [selectedPatient, setSelectedPatient] = useState(null);

    return (
        <div style={{ height: "100vh", background: "#f8f9fa" }}>
            {!selectedPatient ? (
                // Show Table First
                <PatientTable onRowClick={(patient) => setSelectedPatient(patient)} />
            ) : (
                // Show Tabs + Timeline when patient is selected
                <TabsPanel patient={selectedPatient} />
            )}
        </div>
    );
}

export default App;
