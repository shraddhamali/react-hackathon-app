import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { Box, Typography, Paper } from '@mui/material';

// Register a cool color theme
const COOL_THEME = {
    color: ['#0097a7', '#1e88e5', '#7c4dff', '#2a9d8f', '#8e24aa', '#00e5ff', '#42a5f5', '#5c9cff'],
    backgroundColor: '#ffffff',
    textStyle: { color: '#1f2d3d' },
    title: { textStyle: { color: '#1f2d3d', fontWeight: '600' }, subtextStyle: { color: '#607d8b' } },
    tooltip: { backgroundColor: 'rgba(38,50,56,0.92)', borderWidth: 0, textStyle: { color: '#e0f7fa' } },
    legend: { textStyle: { color: '#37474f' } },
    axisPointer: { lineStyle: { color: '#80deea' }, crossStyle: { color: '#80deea' } },
    grid: { containLabel: true },
    categoryAxis: { axisLine: { lineStyle: { color: '#90a4ae' } }, axisTick: { lineStyle: { color: '#90a4ae' } }, axisLabel: { color: '#455a64' }, splitLine: { show: false } },
    valueAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#455a64' }, splitLine: { lineStyle: { color: '#eceff1' } } },
    dataZoom: [
        { fillerColor: 'rgba(0, 151, 167, 0.18)', handleStyle: { color: '#0097a7', borderColor: '#0097a7' }, moveHandleStyle: { color: '#0097a7' }, textStyle: { color: '#546e7a' } },
        { handleStyle: { color: '#5e35b1', borderColor: '#5e35b1' }, moveHandleStyle: { color: '#5e35b1' }, textStyle: { color: '#546e7a' } }
    ],
    line: { smooth: true, symbolSize: 6 },
    bar: { itemStyle: { borderRadius: [4, 4, 0, 0] } },
    visualMap: { inRange: { color: ['#2a9d8f', '#29b6f6', '#7c4dff'] } }
};
echarts.registerTheme('cool-med', COOL_THEME);

function PatientGraph({ patient }) {
    const [graphResponse, setGraph] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("patientData");
        if (storedData) {
            const patients = JSON.parse(storedData)?.patients || [];
            const patientDetail = patients.find((p) => p._id === patient?._id);
            if (patientDetail?.ai_response?.graphs) {
                setGraph(patientDetail.ai_response.graphs);
            }
        }
    }, [patient]);

    const toDate = (d) => new Date(d).getTime();
    const categoryToValue = (c) => ({ Normal: 0, Elevated: 0.5, 'Stage 1': 1, 'Stage 2': 2, 'Hypertensive Crisis': 3 }[c] ?? 0);
    const categoryValueToLabel = (v) => v >= 3 ? 'Crisis' : v >= 2 ? 'Stage 2' : v >= 1 ? 'Stage 1' : v > 0 ? 'Elevated' : 'Normal';

    const commonTimeSeriesEnhancements = (xDates) => ({
        animationDuration: 600,
        animationEasing: 'cubicOut',
        dataZoom: [{ type: 'inside', xAxisIndex: 0, minSpan: 10 }, { type: 'slider', xAxisIndex: 0 }],
        axisPointer: { link: [{ xAxisIndex: 'all' }] },
        grid: { left: 48, right: 24, top: 48, bottom: 64 }
    });

    const lineSeriesEnhancements = {
        symbolSize: 7,
        lineStyle: { color: '#1976d2', width: 2 },
        itemStyle: { color: '#1976d2' },
        emphasis: { focus: 'series', lineStyle: { width: 3 }, scale: true, itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.15)' } },
        areaStyle: { color: '#1976d2', opacity: 0.1 }
    };

    const buildOption = (graph) => {
        if (!graph || !graph.graph_data) return { title: { text: 'No Data' } };
        const name = graph.graph_name;
        const data = [...graph.graph_data].sort((a, b) => toDate(a.date) - toDate(b.date));

        // Example: Weight chart
        if (name.includes('Weight')) {
            const x = data.map(d => d.date);
            const enh = commonTimeSeriesEnhancements(x);
            return {
                title: { text: name, left: 'center', top: 10, textStyle: { fontSize: 14, fontWeight: 'bold' } },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: x, axisLabel: { rotate: 45, fontSize: 10, interval: 0 } },
                yAxis: { type: 'value', name: 'lb', nameLocation: 'middle', nameGap: 30, nameTextStyle: { fontSize: 12 } },
                dataZoom: enh.dataZoom,
                grid: { left: 60, right: 30, top: 50, bottom: 80, containLabel: true },
                animationDuration: enh.animationDuration,
                animationEasing: enh.animationEasing,
                series: [{ name: 'Weight', type: 'line', data: data.map(d => d.weight_lb ?? 0), ...lineSeriesEnhancements }]
            };
        }

        // Blood Pressure Chart - Dual line chart
        if (name.includes('Blood Pressure') || name.includes('BP')) {
            const x = data.map(d => d.date);
            const systolic = data.map(d => d.systolic || d.sbp || 0);
            const diastolic = data.map(d => d.diastolic || d.dbp || 0);
            return {
                title: { text: name, left: 'center', top: 10, textStyle: { fontSize: 14, fontWeight: 'bold' } },
                tooltip: { trigger: 'axis' },
                legend: { data: ['Systolic', 'Diastolic'], top: 30 },
                xAxis: { type: 'category', data: x, axisLabel: { rotate: 45, fontSize: 10 } },
                yAxis: { type: 'value', name: 'mmHg', nameLocation: 'middle', nameGap: 30 },
                grid: { left: 60, right: 30, top: 60, bottom: 80, containLabel: true },
                series: [
                    { name: 'Systolic', type: 'line', data: systolic, itemStyle: { color: '#e74c3c' }, lineStyle: { color: '#e74c3c', width: 3 } },
                    { name: 'Diastolic', type: 'line', data: diastolic, itemStyle: { color: '#3498db' }, lineStyle: { color: '#3498db', width: 3 } }
                ]
            };
        }

        // Heart Rate Chart - Bar chart
        if (name.includes('Heart Rate') || name.includes('Pulse')) {
            const x = data.map(d => d.date);
            const heartRates = data.map(d => d.heart_rate ?? d.pulse ?? d.hr ?? 0);
            return {
                title: { text: name, left: 'center', top: 10, textStyle: { fontSize: 14, fontWeight: 'bold' } },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: x, axisLabel: { rotate: 45, fontSize: 10 } },
                yAxis: { type: 'value', name: 'BPM', nameLocation: 'middle', nameGap: 30 },
                grid: { left: 60, right: 30, top: 50, bottom: 80, containLabel: true },
                series: [{
                    name: 'Heart Rate',
                    type: 'bar',
                    data: heartRates,
                    itemStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
                                { offset: 0, color: '#ff6b6b' },
                                { offset: 0.5, color: '#4ecdc4' },
                                { offset: 1, color: '#45b7d1' }
                            ]
                        },
                        borderRadius: [4, 4, 0, 0]
                    }
                }]
            };
        }

        // Lab Values Chart - Scatter plot
        if (name.includes('Lab') || name.includes('Glucose') || name.includes('Cholesterol')) {
            const x = data.map((d, i) => i);
            const values = data.map(d => Object.values(d).find(v => typeof v === 'number') ?? 0);
            const dates = data.map(d => d.date);
            return {
                title: { text: name, left: 'center', top: 10, textStyle: { fontSize: 14, fontWeight: 'bold' } },
                tooltip: { trigger: 'item' },
                xAxis: { type: 'category', data: dates, axisLabel: { rotate: 45, fontSize: 10 } },
                yAxis: { type: 'value', name: 'Value', nameLocation: 'middle', nameGap: 30 },
                grid: { left: 60, right: 30, top: 50, bottom: 80, containLabel: true },
                series: [{
                    name: 'Lab Values',
                    type: 'scatter',
                    data: values.map((v, i) => [i, v]),
                    symbolSize: 8,
                    itemStyle: { color: '#9c27b0' }
                }]
            };
        }

        // Temperature Chart - Gauge chart
        if (name.includes('Temperature') || name.includes('Temp')) {
            const latestTemp = data[data.length - 1]?.temperature || data[data.length - 1]?.temp || 98.6;
            return {
                title: { text: name, left: 'center', top: 10, textStyle: { fontSize: 14, fontWeight: 'bold' } },
                series: [{
                    name: 'Temperature',
                    type: 'gauge',
                    center: ['50%', '60%'],
                    startAngle: 200,
                    endAngle: -20,
                    min: 95,
                    max: 105,
                    splitNumber: 10,
                    itemStyle: { color: latestTemp > 100 ? '#ff4757' : latestTemp > 99 ? '#ffa502' : '#2ed573' },
                    progress: { show: true, width: 18 },
                    pointer: { show: true, itemStyle: { color: 'auto' } },
                    axisLine: { lineStyle: { width: 18 } },
                    axisTick: { distance: -30, splitNumber: 5, lineStyle: { width: 2, color: 'auto' } },
                    splitLine: { distance: -30, length: 30, lineStyle: { width: 4, color: 'auto' } },
                    axisLabel: { distance: -20, color: 'auto', fontSize: 12 },
                    detail: { valueAnimation: true, formatter: '{value}°F', color: 'auto' },
                    data: [{ value: latestTemp, name: 'Temperature' }]
                }]
            };
        }

        // fallback generic line chart
        const x = data.map((d, i) => d.date || `Item ${i + 1}`);
        const yData = data.map(d => Object.values(d).find(v => typeof v === 'number') ?? 0);
        return {
            title: { text: name },
            xAxis: { type: 'category', data: x },
            yAxis: { type: 'value' },
            series: [{ type: 'line', data: yData, ...lineSeriesEnhancements }]
        };
    };

    if (!patient) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" color="text.secondary">
                    Please select a patient to view graphs
                </Typography>
            </Box>
        );
    }

    const graphs = Array.isArray(graphResponse) ? graphResponse : [];

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ flex: 1, overflow: "auto", p: 1 }}>
                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                    {Array.from({ length: Math.ceil(graphs.length / 2) }, (_, rowIndex) => {
                        const leftGraph = graphs[rowIndex * 2];
                        const rightGraph = graphs[rowIndex * 2 + 1];

                        if (!leftGraph && !rightGraph) return null;

                        return (
                            <Box key={rowIndex} sx={{ display: "flex", width: "100%", gap: 2, minHeight: "320px" }}>
                                {[leftGraph, rightGraph].map((g, idx) => (
                                    <Box key={idx} sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
                                        {g ? (
                                            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, height: "100%", display: "flex", flexDirection: "column" }}>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2, minHeight: "50px" }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: "14px", flex: 1, mr: 1 }}>
                                                        {g.graph_name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "11px", lineHeight: 1.3, flex: 1, textAlign: "right" }}>
                                                        {g.summary_of_day}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ flex: 1, minHeight: "250px", width: "100%" }}>
                                                    <ReactECharts option={buildOption(g)} style={{ height: "250px", width: "100%" }} notMerge lazyUpdate />
                                                </Box>
                                            </Paper>
                                        ) : <Box sx={{ height: "100%" }} />}
                                    </Box>
                                ))}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
}

export default PatientGraph;
