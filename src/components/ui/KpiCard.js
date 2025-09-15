import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown, Remove } from '@mui/icons-material';

function KpiCard({ title, value, unit, trend = 'stable', variant = 'primary', sparklineData = [] }) {
    const getTrendIcon = () => {
        switch (trend) {
            case 'up':
                return <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />;
            case 'down':
                return <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />;
            default:
                return <Remove sx={{ fontSize: 16, color: 'text.secondary' }} />;
        }
    };

    const getVariantColors = () => {
        switch (variant) {
            case 'success':
                return {
                    borderTop: '4px solid #22C55E',
                    iconBg: '#DCFCE7',
                    iconColor: '#22C55E',
                };
            case 'warning':
                return {
                    borderTop: '4px solid #F59E0B',
                    iconBg: '#FEF3C7',
                    iconColor: '#F59E0B',
                };
            case 'error':
                return {
                    borderTop: '4px solid #EF4444',
                    iconBg: '#FEE2E2',
                    iconColor: '#EF4444',
                };
            default:
                return {
                    borderTop: '4px solid #1E88E5',
                    iconBg: '#E3F2FD',
                    iconColor: '#1E88E5',
                };
        }
    };

    const colors = getVariantColors();

    return (
        <Paper
            sx={{
                p: 3,
                width: '100%',
                height: 140,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                ...colors,
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 28px rgba(2, 6, 23, 0.12)',
                },
                transition: 'all 0.2s ease',
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '12px',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                    }}
                >
                    {title}
                </Typography>
                {getTrendIcon()}
            </Box>

            {/* Value */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: 'text.primary',
                            fontWeight: 700,
                            fontSize: '28px',
                            lineHeight: 1,
                            mb: 0.5,
                        }}
                    >
                        {value}
                    </Typography>
                    {unit && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '11px',
                                fontWeight: 500,
                            }}
                        >
                            {unit}
                        </Typography>
                    )}
                </Box>
                {/* Sparkline placeholder */}
                <Box>
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'end',
                            gap: 0.5,
                            opacity: 0.6,
                        }}
                    >
                        {Array.from({ length: 8 }, (_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: 3,
                                    height: Math.random() * 20 + 5,
                                    backgroundColor: colors.iconColor,
                                    borderRadius: 1.5,
                                }}
                            />
                        ))}
                    </Box>
                </Box>

            </Box>

        </Paper>
    );
}

export default KpiCard;
