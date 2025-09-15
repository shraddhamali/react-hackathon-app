import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { Box, Typography, Paper, Grid } from '@mui/material';

// Register a cool color theme (blues/teals/purples) - slightly darker blues
const COOL_THEME = {
    color: ['#0097a7', '#1e88e5', '#7c4dff', '#2a9d8f', '#8e24aa', '#00e5ff', '#42a5f5', '#5c9cff'],
    backgroundColor: '#ffffff',
    textStyle: { color: '#1f2d3d', fontFamily: 'Poppins' },
    title: { textStyle: { color: '#1f2d3d', fontWeight: '600', fontFamily: 'Poppins' }, subtextStyle: { color: '#607d8b', fontFamily: 'Poppins' } },
    tooltip: { backgroundColor: 'rgba(38,50,56,0.92)', borderWidth: 0, textStyle: { color: '#e0f7fa', fontFamily: 'Poppins' } },
    legend: { textStyle: { color: '#37474f', fontFamily: 'Poppins' } },
    axisPointer: { lineStyle: { color: '#80deea' }, crossStyle: { color: '#80deea' } },
    grid: { containLabel: true },
    categoryAxis: {
        axisLine: { lineStyle: { color: '#90a4ae' } },
        axisTick: { lineStyle: { color: '#90a4ae' } },
        axisLabel: { color: '#455a64', fontFamily: 'Poppins' },
        splitLine: { show: false }
    },
    valueAxis: {
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#455a64', fontFamily: 'Poppins' },
        splitLine: { lineStyle: { color: '#eceff1' } }
    },
    dataZoom: [
        {
            fillerColor: 'rgba(0, 151, 167, 0.18)',
            handleStyle: { color: '#0097a7', borderColor: '#0097a7' },
            moveHandleStyle: { color: '#0097a7' },
            textStyle: { color: '#546e7a', fontFamily: 'Poppins' }
        },
        {
            handleStyle: { color: '#5e35b1', borderColor: '#5e35b1' },
            moveHandleStyle: { color: '#5e35b1' },
            textStyle: { color: '#546e7a', fontFamily: 'Poppins' }
        }
    ],
    line: { smooth: true, symbolSize: 6 },
    bar: { itemStyle: { borderRadius: [4, 4, 0, 0] } },
    visualMap: { inRange: { color: ['#2a9d8f', '#29b6f6', '#7c4dff'] } }
};
echarts.registerTheme('cool-med', COOL_THEME);

function PatientGraph({ patient, specificGraph, showKPI = true }) {
    // Generate comprehensive medical data with multiple visualization types
    const response = useMemo(() => {
        if (!patient) return { graphs: [] };

        /* // Generate sample data based on patient age and demographics
         const baseWeight = patient.sex === "M" ? 180 : 150;
         const ageFactor = patient.age / 50;
         const baseWeightAdjusted = baseWeight + ageFactor * 20;
 
         const baseBP =
             patient.age > 60
                 ? { systolic: 140, diastolic: 85 }
                 : { systolic: 120, diastolic: 80 };*/

        // 🔹 Get from localStorage instead of static graphs
        const storedData = localStorage.getItem("patientData");
        if (storedData) {
            const patients = JSON.parse(storedData)?.patients || [];
            const patientDetail = patients.find((p) => p._id === patient?._id);

            if (patientDetail?.ai_response?.graphs) {
                return { graphs: patientDetail.ai_response.graphs };
            }
        }

        // fallback if no localStorage data
        return { graphs: [] };
    }, [patient]);


    const toDate = (d) => new Date(d).getTime();

    const categoryToValue = (c) => {
        const map = { Normal: 0, Elevated: 0.5, 'Stage 1': 1, 'Stage 2': 2, 'Hypertensive Crisis': 3 };
        return map[c] ?? 0;
    };

    const categoryValueToLabel = (v) => {
        if (v >= 3) return 'Crisis';
        if (v >= 2) return 'Stage 2';
        if (v >= 1) return 'Stage 1';
        if (v > 0) return 'Elevated';
        return 'Normal';
    };

    const commonTimeSeriesEnhancements = (xDates) => ({
        animationDuration: 600,
        animationEasing: 'cubicOut',
        dataZoom: [
            { type: 'inside', xAxisIndex: 0, minSpan: 10 },
            { type: 'slider', xAxisIndex: 0 }
        ],
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
        const name = graph.graph_name;
        const type = graph.graph_type;
        const data = [...graph.graph_data];
        if (data.length && data[0].date) {
            data.sort((a, b) => toDate(a.date) - toDate(b.date));
        }

        if (type === 'line' || graph.graph_name.includes('Weight by Encounter')) {
            const x = data.map((d) => d.date);
            const enh = commonTimeSeriesEnhancements(x);
            return {
                title: {
                    text: graph.graph_name,
                    left: 'center',
                    top: 10,
                    textStyle: { fontSize: 14, fontWeight: 'bold' }
                },
                tooltip: { trigger: 'axis' },
                xAxis: {
                    type: 'category',
                    data: x,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'lb',
                    nameLocation: 'middle',
                    nameGap: 30,
                    nameTextStyle: { fontSize: 12 }
                },
                dataZoom: enh.dataZoom,
                grid: {
                    left: 60,
                    right: 30,
                    top: 50,
                    bottom: 80,
                    containLabel: true
                },
                animationDuration: enh.animationDuration,
                animationEasing: enh.animationEasing,
                series: [{ name: 'Weight', type: 'line', data: data.map((d) => parseFloat(d.value) || 0), ...lineSeriesEnhancements }]
            };
        }

        if (type === 'line' && (name.includes('BMI') || data[0]?.bmi !== undefined)) {
            const x = data.map((d) => d.date);
            const enh = commonTimeSeriesEnhancements(x);
            return {
                title: {
                    text: name,
                    left: 'center',
                    top: 10,
                    textStyle: { fontSize: 14, fontWeight: 'bold' }
                },
                tooltip: { trigger: 'axis' },
                xAxis: {
                    type: 'category',
                    data: x,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    nameTextStyle: { fontSize: 12 }
                },
                dataZoom: enh.dataZoom,
                grid: {
                    left: 60,
                    right: 30,
                    top: 50,
                    bottom: 80,
                    containLabel: true
                },
                animationDuration: enh.animationDuration,
                animationEasing: enh.animationEasing,
                series: [{ name: 'BMI', type: 'line', data: data.map((d) => d.bmi), ...lineSeriesEnhancements }],
                markLine: {
                    silent: true,
                    lineStyle: { color: '#7c4dff' },
                    data: [
                        { yAxis: 25, label: { formatter: 'Overweight 25', position: 'end' } },
                        { yAxis: 30, label: { formatter: 'Obesity 30', position: 'end' } }
                    ]
                }
            };
        }

        if (type === 'line' && (name.includes('Blood Pressure') || data[0]?.systolic !== undefined)) {
            const x = data.map((d) => d.date);
            const enh = commonTimeSeriesEnhancements(x);
            return {
                title: {
                    text: name,
                    left: 'center',
                    top: 10,
                    textStyle: { fontSize: 14, fontWeight: 'bold' }
                },
                tooltip: { trigger: 'axis' },
                legend: {
                    data: ['Systolic', 'Diastolic'],
                    top: 35,
                    left: 'center',
                    itemGap: 20
                },
                xAxis: {
                    type: 'category',
                    data: x,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'mmHg',
                    nameLocation: 'middle',
                    nameGap: 30,
                    nameTextStyle: { fontSize: 12 }
                },
                dataZoom: enh.dataZoom,
                grid: {
                    left: 60,
                    right: 30,
                    top: 70,
                    bottom: 80,
                    containLabel: true
                },
                animationDuration: enh.animationDuration,
                animationEasing: enh.animationEasing,
                series: [
                    { name: 'Systolic', type: 'line', data: data.map((d) => d.systolic), ...lineSeriesEnhancements },
                    { name: 'Diastolic', type: 'line', data: data.map((d) => d.diastolic), ...lineSeriesEnhancements }
                ],
                markLine: {
                    silent: true,
                    lineStyle: { color: '#0097a7' },
                    data: [
                        { yAxis: 120, label: { formatter: 'SBP 120', position: 'end' } },
                        { yAxis: 130, label: { formatter: 'SBP 130', position: 'end' } },
                        { yAxis: 140, label: { formatter: 'SBP 140', position: 'end' } }
                    ]
                }
            };
        }

        if (type === 'line' && (name.includes('Heart Rate') || data[0]?.heart_rate_bpm !== undefined)) {
            const x = data.map((d) => d.date);
            const enh = commonTimeSeriesEnhancements(x);
            return {
                title: {
                    text: name,
                    left: 'center',
                    top: 10,
                    textStyle: { fontSize: 14, fontWeight: 'bold' }
                },
                tooltip: { trigger: 'axis' },
                xAxis: {
                    type: 'category',
                    data: x,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'bpm',
                    nameLocation: 'middle',
                    nameGap: 30,
                    nameTextStyle: { fontSize: 12 }
                },
                dataZoom: enh.dataZoom,
                grid: {
                    left: 60,
                    right: 30,
                    top: 50,
                    bottom: 80,
                    containLabel: true
                },
                animationDuration: enh.animationDuration,
                animationEasing: enh.animationEasing,
                series: [{ name: 'HR', type: 'line', data: data.map((d) => d.heart_rate_bpm), ...lineSeriesEnhancements }]
            };
        }

        if (type === 'line' && (name.includes('Oxygen Saturation') || data[0]?.spo2_percent !== undefined)) {
            const x = data.map((d) => d.date);
            const enh = commonTimeSeriesEnhancements(x);
            return {
                title: {
                    text: name,
                    left: 'center',
                    top: 10,
                    textStyle: { fontSize: 14, fontWeight: 'bold' }
                },
                tooltip: { trigger: 'axis' },
                xAxis: {
                    type: 'category',
                    data: x,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    min: 90,
                    max: 100,
                    name: '%',
                    nameLocation: 'middle',
                    nameGap: 30,
                    nameTextStyle: { fontSize: 12 }
                },
                dataZoom: enh.dataZoom,
                grid: {
                    left: 60,
                    right: 30,
                    top: 50,
                    bottom: 80,
                    containLabel: true
                },
                animationDuration: enh.animationDuration,
                animationEasing: enh.animationEasing,
                series: [{ name: 'SpO2', type: 'line', data: data.map((d) => d.spo2_percent), ...lineSeriesEnhancements }]
            };
        }

        if (type === 'bar' || name.includes('Blood Pressure Category')) {
            const x = data.map((d) => d.date);
            return {
                title: {
                    text: name,
                    left: 'center',
                    top: 10,
                    textStyle: { fontSize: 14, fontWeight: 'bold' }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: (params) => {
                        const p = params[0];
                        return `${p.axisValue}<br/>${p.value}`;
                    }
                },
                xAxis: {
                    type: 'category',
                    data: x,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ['Normal', 'Stage 1', 'Stage 2', 'Stage 3'],
                    axisLabel: {
                        fontSize: 10
                    }
                },
                dataZoom: [
                    { type: 'inside', xAxisIndex: 0, minSpan: 10 },
                    { type: 'slider', xAxisIndex: 0 }
                ],
                grid: {
                    left: 60,
                    right: 30,
                    top: 50,
                    bottom: 80,
                    containLabel: true
                },
                series: [
                    { name: 'Category', type: 'bar', data: data.map((d) => d.scale), emphasis: { focus: 'series' } }
                ]
            };
        }

        if (type === 'multi-line' || name.includes('Blood Pressure by Encounter')) {
            const x = data.map((d) => d.date);
            return {
                title: {
                    text: name,
                    left: 'center',
                    top: 10,
                    textStyle: { fontSize: 14, fontWeight: 'bold' }
                },
                tooltip: { trigger: 'axis' },
                legend: {
                    data: ['Systolic', 'Diastolic'],
                    top: 35,
                    left: 'center',
                    itemGap: 20
                },
                xAxis: {
                    type: 'category',
                    data: x,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'mmHg',
                    nameLocation: 'middle',
                    nameGap: 30,
                    nameTextStyle: { fontSize: 12 }
                },
                dataZoom: [
                    { type: 'inside', xAxisIndex: 0, minSpan: 10 },
                    { type: 'slider', xAxisIndex: 0 }
                ],
                grid: {
                    left: 60,
                    right: 30,
                    top: 70,
                    bottom: 80,
                    containLabel: true
                },
                series: [
                    { name: 'Systolic', type: 'line', data: data.map((d) => parseFloat(d.line_1) || 0), ...lineSeriesEnhancements },
                    { name: 'Diastolic', type: 'line', data: data.map((d) => parseFloat(d.line_2) || 0), ...lineSeriesEnhancements }
                ]
            };
        }

        if (type === 'bar' && (name.includes('Medication Adherence') || data[0]?.adherence !== undefined)) {
            const x = data.map((d) => d.date);
            return {
                title: { text: name },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: x },
                yAxis: { type: 'value', min: 0, max: 100, name: '%' },
                series: [
                    { name: 'Adherence', type: 'bar', data: data.map((d) => d.adherence), emphasis: { focus: 'series' } }
                ],
                markLine: {
                    silent: true,
                    lineStyle: { color: '#e74c3c' },
                    data: [
                        { yAxis: 80, label: { formatter: 'Target 80%' } }
                    ]
                }
            };
        }

        if (type === 'heatmap' || name.includes('Symptom Severity Heatmap')) {
            const symptoms = Array.from(new Set(data.map((d) => d.symptom)));
            const dates = Array.from(new Set(data.map((d) => d.date)));
            const matrix = data.map((d) => [symptoms.indexOf(d.symptom), dates.indexOf(d.date), d.severity]);
            return {
                title: { text: name },
                tooltip: { position: 'top' },
                grid: { height: '70%', top: '10%' },
                xAxis: { type: 'category', data: dates, splitArea: { show: true } },
                yAxis: { type: 'category', data: symptoms, splitArea: { show: true } },
                visualMap: { min: 0, max: 5, calculable: false, orient: 'horizontal', left: 'center', bottom: '2%' },
                series: [
                    { name: 'Severity', type: 'heatmap', data: matrix, label: { show: true }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.2)' } } }
                ]
            };
        }

        if (type === 'line' && (name.includes('Risk Score Progression') || data[0]?.risk_score !== undefined)) {
            const x = data.map((d) => d.date);
            return {
                title: { text: name },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: x },
                yAxis: { type: 'value', name: 'Risk Score' },
                dataZoom: [
                    { type: 'inside', xAxisIndex: 0, minSpan: 10 },
                    { type: 'slider', xAxisIndex: 0 }
                ],
                series: [
                    { name: 'Risk Score', type: 'line', data: data.map((d) => d.risk_score), ...lineSeriesEnhancements }
                ],
                markLine: {
                    silent: true,
                    lineStyle: { color: '#e74c3c' },
                    data: [
                        { yAxis: 10, label: { formatter: 'Low Risk 10' } },
                        { yAxis: 20, label: { formatter: 'High Risk 20' } }
                    ]
                }
            };
        }

        if (type === 'timeline') {
            const x = data.map((d) => d.date);
            return {
                title: {
                    text: name,
                    left: 'center',
                    top: 10,
                    textStyle: { fontSize: 14, fontWeight: 'bold' }
                },
                tooltip: { trigger: 'axis' },
                xAxis: {
                    type: 'category',
                    data: x,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'Value',
                    nameLocation: 'middle',
                    nameGap: 30,
                    nameTextStyle: { fontSize: 12 }
                },
                series: [{
                    name: 'Timeline',
                    type: 'scatter',
                    data: data.map((d, index) => ({
                        name: d.date || `Event ${index + 1}`,
                        value: [index, Object.values(d).find((v) => typeof v === 'number') || 0],
                        itemStyle: { color: '#1976d2' }
                    })),
                    symbolSize: 8,
                    itemStyle: { color: '#1976d2' },
                    emphasis: { focus: 'series' }
                }]
            };
        }

        if (type === 'timeline') {
            // Process timeline data - simplified approach
            const timelineData = data.map((d, index) => {
                return {
                    name: d.event,
                    date: d.date,
                    index: index
                };
            });

            // Create simple timeline chart data
            const timelineChartData = timelineData.map((event, index) => {
                return {
                    name: event.name,
                    value: 1, // All bars have same height
                    itemStyle: {
                        color: '#1976d2',
                        borderColor: '#1565c0',
                        borderWidth: 1
                    }
                };
            });

            return {
                title: {
                    text: graph.graph_name,
                    left: 'center',
                    top: 10,
                    textStyle: { fontSize: 14, fontWeight: 'bold' }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: (params) => {
                        const event = timelineData[params.dataIndex];
                        return `${event.name}<br/>Date: ${event.date}`;
                    }
                },
                xAxis: {
                    type: 'category',
                    data: timelineData.map((event, index) => event.name),
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10,
                        interval: 0
                    },
                    axisLine: {
                        show: true
                    },
                    axisTick: {
                        show: true
                    }
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 2,
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    top: 80,
                    bottom: 100,
                    containLabel: true
                },
                series: [{
                    name: 'Timeline Events',
                    type: 'bar',
                    data: timelineChartData,
                    barWidth: '60%',
                    barGap: '10%',
                    itemStyle: {
                        color: '#1976d2',
                        borderColor: '#1565c0',
                        borderWidth: 1
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#1565c0',
                            borderColor: '#0d47a1',
                            borderWidth: 2
                        }
                    }
                }]
            };
        }

        if (type === 'gantt') {
            // Convert dates to timestamps for proper gantt chart rendering
            const tasks = data.map((d, index) => {
                const startDate = new Date(d.start);
                const endDate = new Date(d.end);
                const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Duration in days

                return {
                    name: d.task,
                    start: startDate.getTime(),
                    end: endDate.getTime(),
                    duration: duration,
                    index: index
                };
            });

            // Get all unique dates for x-axis
            const allDates = [...new Set(data.flatMap(d => [d.start, d.end]))].sort();
            const xAxisData = allDates;

            // Create gantt chart data
            const ganttData = tasks.map((task, index) => {
                const startIndex = xAxisData.indexOf(data[index].start);
                const endIndex = xAxisData.indexOf(data[index].end);

                return {
                    name: task.name,
                    value: [startIndex, endIndex, task.duration],
                    itemStyle: { color: '#1976d2' }
                };
            });

            return {
                title: {
                    text: graph.graph_name,
                    left: 'center',
                    top: 10,
                    textStyle: { fontSize: 14, fontWeight: 'bold' }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: (params) => {
                        const data = params[0];
                        const taskData = tasks[data.dataIndex];
                        return `${data.name}<br/>Start: ${data.axisValue}<br/>Duration: ${taskData.duration} days`;
                    }
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10,
                        interval: 0,
                        formatter: (value) => {
                            return new Date(value).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                            });
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    data: tasks.map(t => t.name),
                    axisLabel: {
                        fontSize: 10,
                        interval: 0
                    }
                },
                grid: {
                    left: 150,
                    right: 20,
                    top: 50,
                    bottom: 80,
                    containLabel: true
                },
                series: [{
                    name: 'Gantt',
                    type: 'custom',
                    renderItem: (params, api) => {
                        const categoryIndex = api.value(0);
                        const start = api.coord([api.value(1), categoryIndex]);
                        const end = api.coord([api.value(2), categoryIndex]);
                        const height = api.size([0, 1])[1] * 0.6;

                        return {
                            type: 'rect',
                            shape: {
                                x: start[0],
                                y: start[1] - height / 2,
                                width: Math.max(end[0] - start[0], 20), // Minimum width of 20px
                                height: height
                            },
                            style: {
                                fill: '#1976d2',
                                stroke: '#1565c0',
                                lineWidth: 1
                            }
                        };
                    },
                    data: ganttData
                }]
            };
        }

        return {
            title: { text: graph.graph_name },
            xAxis: { type: 'category', data: data.map((d, i) => d.date || `Item ${i + 1}`) },
            yAxis: { type: 'value' },
            series: [{
                type: 'line',
                data: data.map((d) => Object.values(d).find((v) => typeof v === 'number') || 0),
                lineStyle: { color: '#1976d2', width: 2 },
                itemStyle: { color: '#1976d2' },
                areaStyle: { color: '#1976d2', opacity: 0.1 }
            }]
        };
    };

    // KPI sparkline options - Simplified
    const buildSpark = (label, series, unit) => {
        // Use actual data or create sample data
        const data = series.length > 0 ? series : [
            { date: '2023-01-01', value: 150 },
            { date: '2023-02-01', value: 152 },
            { date: '2023-03-01', value: 148 },
            { date: '2023-04-01', value: 155 },
            { date: '2023-05-01', value: 153 }
        ];

        return {
            title: {
                text: label,
                left: 'center',
                top: 5,
                textStyle: { fontSize: 11, fontWeight: 'bold', color: '#333' }
            },
            grid: {
                left: 10,
                right: 10,
                top: 25,
                bottom: 10,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: data.map(s => s.date),
                axisLabel: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                splitLine: { show: false }
            },
            yAxis: {
                type: 'value',
                axisLabel: { show: false },
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false }
            },
            series: [{
                type: 'line',
                data: data.map(s => s.value),
                smooth: true,
                showSymbol: true,
                symbolSize: 4,
                lineStyle: {
                    width: 3,
                    color: '#1976d2'
                },
                itemStyle: {
                    color: '#1976d2',
                    borderColor: '#fff',
                    borderWidth: 1
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(25, 118, 210, 0.3)' },
                            { offset: 1, color: 'rgba(25, 118, 210, 0.05)' }
                        ]
                    }
                }
            }],
            tooltip: {
                trigger: 'axis',
                formatter: (p) => `${p[0].axisValue}<br/>${p[0].value} ${unit || ''}`,
                backgroundColor: 'rgba(0,0,0,0.8)',
                textStyle: { color: '#fff' }
            }
        };
    };

    const kpiData = (() => {
        const weight = response.graphs.find(g => g.graph_name.includes('Weight by Encounter'))?.graph_data.map(d => ({ date: d.date, value: d.weight_lb })) || [];
        const bmi = response.graphs.find(g => g.graph_name.includes('BMI'))?.graph_data.map(d => ({ date: d.date, value: d.bmi })) || [];
        const bp = response.graphs.find(g => g.graph_name.includes('Blood Pressure by Encounter'))?.graph_data.map(d => ({ date: d.date, value: d.systolic })) || [];
        const hr = response.graphs.find(g => g.graph_name.includes('Heart Rate'))?.graph_data.map(d => ({ date: d.date, value: d.heart_rate_bpm })) || [];

        console.log('KPI Data Debug:', { weight, bmi, bp, hr });
        return { weight, bmi, bp, hr };
    })();

    if (!patient) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" color="text.secondary">
                    Please select a patient to view graphs
                </Typography>
            </Box>
        );
    }

    // If specificGraph is provided, render only that graph
    if (specificGraph) {
        return (
            <Box sx={{ height: "100%", width: "100%" }}>
                <ReactECharts
                    option={buildOption(specificGraph)}
                    style={{ height: "320px", width: "100%" }}
                    notMerge={true}
                    lazyUpdate={true}
                    theme="cool-med"
                />
            </Box>
        );
    }

    // Debug: Log the data to console
    console.log('PatientGraph - Patient:', patient);
    console.log('PatientGraph - Response:', response);
    console.log('PatientGraph - KPI Data:', kpiData);

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Scrollable Content */}
            <Box sx={{ flex: 1, overflow: "auto", p: 1 }}>

                {/* KPI header with sparklines - 4 boxes, 25% each */}
                {showKPI && (
                    <Box sx={{ display: 'flex', width: '100%', gap: 1, mb: 3 }}>
                        {/* Weight Box - 25% */}
                        <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column' }}>
                            <Paper elevation={2} sx={{ p: 1.5, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                {/* <Typography variant="caption" sx={{ display: 'block', mb: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>
                                Weight
                            </Typography> */}
                                <Box sx={{ flex: 1, minHeight: '80px' }}>
                                    <ReactECharts
                                        option={buildSpark('Weight', kpiData.weight, 'lb')}
                                        style={{ height: '80px', width: '100%' }}
                                        notMerge={true}
                                        lazyUpdate={true}
                                    />
                                </Box>
                            </Paper>
                        </Box>

                        {/* BMI Box - 25% */}
                        <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column' }}>
                            <Paper elevation={2} sx={{ p: 1.5, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                {/* <Typography variant="caption" sx={{ display: 'block', mb: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>
                                BMI
                            </Typography> */}
                                <Box sx={{ flex: 1, minHeight: '80px' }}>
                                    <ReactECharts
                                        option={buildSpark('BMI', kpiData.bmi, '')}
                                        style={{ height: '80px', width: '100%' }}
                                        notMerge={true}
                                        lazyUpdate={true}
                                    />
                                </Box>
                            </Paper>
                        </Box>

                        {/* SBP Box - 25% */}
                        <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column' }}>
                            <Paper elevation={2} sx={{ p: 1.5, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                {/* <Typography variant="caption" sx={{ display: 'block', mb: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>
                                SBP
                            </Typography> */}
                                <Box sx={{ flex: 1, minHeight: '80px' }}>
                                    <ReactECharts
                                        option={buildSpark('SBP', kpiData.bp, 'mmHg')}
                                        style={{ height: '80px', width: '100%' }}
                                        notMerge={true}
                                        lazyUpdate={true}
                                    />
                                </Box>
                            </Paper>
                        </Box>

                        {/* HR Box - 25% */}
                        <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column' }}>
                            <Paper elevation={2} sx={{ p: 1.5, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                {/* <Typography variant="caption" sx={{ display: 'block', mb: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>
                                HR
                            </Typography> */}
                                <Box sx={{ flex: 1, minHeight: '80px' }}>
                                    <ReactECharts
                                        option={buildSpark('HR', kpiData.hr, 'bpm')}
                                        style={{ height: '80px', width: '100%' }}
                                        notMerge={true}
                                        lazyUpdate={true}
                                    />
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                )}

                {/* Main graphs - 2 per row, 50% each with proper spacing */}
                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                    {Array.from({ length: Math.ceil(response.graphs.length / 2) }, (_, rowIndex) => {
                        const leftGraph = response.graphs[rowIndex * 2];
                        const rightGraph = response.graphs[rowIndex * 2 + 1];

                        return (
                            <Box key={rowIndex} sx={{ display: "flex", width: "100%", gap: 2, minHeight: "320px" }}>
                                {/* Left graph - 50% width */}
                                <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
                                    <Paper elevation={2} sx={{ p: 2, borderRadius: 2, height: "100%", display: "flex", flexDirection: "column" }}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2, minHeight: "50px" }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: "14px", flex: 1, mr: 1 }}>
                                                {leftGraph.graph_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "11px", lineHeight: 1.3, flex: 1, textAlign: "right" }}>
                                                {leftGraph.summary_of_day}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1, minHeight: "250px", width: "100%" }}>
                                            <ReactECharts
                                                option={buildOption(leftGraph)}
                                                style={{ height: "250px", width: "100%" }}
                                                notMerge={true}
                                                lazyUpdate={true}
                                            />
                                        </Box>
                                    </Paper>
                                </Box>

                                {/* Right graph - 50% width */}
                                <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
                                    {rightGraph ? (
                                        <Paper elevation={2} sx={{ p: 2, borderRadius: 2, height: "100%", display: "flex", flexDirection: "column" }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2, minHeight: "50px" }}>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: "14px", flex: 1, mr: 1 }}>
                                                    {rightGraph.graph_name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "11px", lineHeight: 1.3, flex: 1, textAlign: "right" }}>
                                                    {rightGraph.summary_of_day}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, minHeight: "250px", width: "100%" }}>
                                                <ReactECharts
                                                    option={buildOption(rightGraph)}
                                                    style={{ height: "250px", width: "100%" }}
                                                    notMerge={true}
                                                    lazyUpdate={true}
                                                />
                                            </Box>
                                        </Paper>
                                    ) : (
                                        <Box sx={{ height: "100%" }} />
                                    )}
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
}

export default PatientGraph;
