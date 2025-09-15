import React, { useMemo } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import PatientGraph from './PatientGraph';

export default function FilteredGraphRenderer({ selectedType, graphs, patient }) {
    const filteredGraphs = useMemo(() => {
        if (!graphs || graphs.length === 0) return [];

        if (selectedType === 'all') {
            return graphs;
        }

        return graphs.filter(graph => graph.graph_type === selectedType);
    }, [graphs, selectedType]);

    const graphCounts = useMemo(() => {
        if (!graphs || graphs.length === 0) return {};

        const counts = { all: graphs.length };
        const types = ['line', 'bar', 'heatmap', 'timeline', 'gantt', 'multiline'];

        types.forEach(type => {
            counts[type] = graphs.filter(graph => graph.graph_type === type).length;
        });

        return counts;
    }, [graphs]);

    if (!patient) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" color="text.secondary">
                    Please select a patient to view graphs
                </Typography>
            </Box>
        );
    }

    if (filteredGraphs.length === 0) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" color="text.secondary">
                    No {selectedType === 'all' ? '' : selectedType} charts available for this patient
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ flex: 1, overflow: "auto", p: 1 }}>
                <Grid container spacing={2}>
                    {filteredGraphs.map((graph, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, height: "400px", display: "flex", flexDirection: "column" }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2, minHeight: "50px" }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: "14px", flex: 1, mr: 1 }}>
                                        {graph.graph_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "11px", lineHeight: 1.3, flex: 1, textAlign: "right" }}>
                                        {graph.summary_of_day}
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1, minHeight: "320px", width: "100%" }}>
                                    <PatientGraph
                                        patient={patient}
                                        specificGraph={graph}
                                        showKPI={false}
                                    />
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
