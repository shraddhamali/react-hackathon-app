import React from 'react';
import { Box, Button, Typography, Paper, Chip } from '@mui/material';
import {
    ShowChart,
    BarChart,
    GridOn,
    Timeline,
    Assignment,
    MultilineChart
} from '@mui/icons-material';

const chartTypes = [
    { id: 'all', label: 'All Charts', icon: <MultilineChart />, color: '#1976d2' },
    { id: 'line', label: 'Line Charts', icon: <ShowChart />, color: '#1976d2' },
    { id: 'bar', label: 'Bar Charts', icon: <BarChart />, color: '#388e3c' },
    { id: 'heatmap', label: 'Heatmaps', icon: <GridOn />, color: '#f57c00' },
    { id: 'timeline', label: 'Timeline', icon: <Timeline />, color: '#7b1fa2' },
    { id: 'gantt', label: 'Gantt Charts', icon: <Assignment />, color: '#d32f2f' },
    { id: 'multiline', label: 'Multi-line Charts', icon: <MultilineChart />, color: '#0097a7' }
];

export default function ChartTypeFilter({ selectedType, onTypeChange, graphCounts }) {
    return (
        <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50' }}>
                📊 Filter by Chart Type
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {chartTypes.map((type) => (
                    <Chip
                        key={type.id}
                        icon={type.icon}
                        label={`${type.label} ${graphCounts[type.id] ? `(${graphCounts[type.id]})` : ''}`}
                        onClick={() => onTypeChange(type.id)}
                        variant={selectedType === type.id ? 'filled' : 'outlined'}
                        sx={{
                            color: selectedType === type.id ? 'white' : type.color,
                            backgroundColor: selectedType === type.id ? type.color : 'transparent',
                            borderColor: type.color,
                            '&:hover': {
                                backgroundColor: selectedType === type.id ? type.color : `${type.color}20`,
                            },
                            fontWeight: 'bold'
                        }}
                    />
                ))}
            </Box>
        </Paper>
    );
}
