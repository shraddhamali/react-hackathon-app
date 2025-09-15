import React from 'react';
import { Box, Typography, ButtonBase } from '@mui/material';
import {
    Dashboard,
    TrendingUp,
    MonitorHeart
} from '@mui/icons-material';

const railItems = [
    { id: 'summary', label: 'Overview', icon: Dashboard },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'signals', label: 'Signals', icon: MonitorHeart },
];

function IconRail({ activeTab, onTabChange }) {
    return (
        <Box
            sx={{
                width: 88,
                bgcolor: 'background.paper',
                borderRight: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                py: 2,
                gap: 1,
            }}
        >
            {railItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;

                return (
                    <ButtonBase
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 0.5,
                            py: 2,
                            px: 1,
                            mx: 1,
                            borderRadius: 3,
                            minHeight: 72,
                            transition: 'all 0.3s ease-in-out',
                            backgroundColor: isActive ? 'primary.100' : 'transparent',
                            color: isActive ? 'primary.dark' : 'text.secondary',
                            transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                            boxShadow: isActive ? '0 2px 8px rgba(21, 101, 192, 0.2)' : 'none',
                            '&:hover': {
                                backgroundColor: isActive ? 'primary.100' : 'rgba(0, 0, 0, 0.04)',
                                transform: isActive ? 'translateX(4px)' : 'translateX(2px)',
                            },
                        }}
                    >
                        <IconComponent
                            sx={{
                                fontSize: 24,
                                color: isActive ? 'primary.dark' : 'text.secondary',
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '11px',
                                fontWeight: isActive ? 700 : 500,
                                textAlign: 'center',
                                lineHeight: 1.2,
                                color: isActive ? 'primary.dark' : 'text.secondary',
                            }}
                        >
                            {item.label}
                        </Typography>
                    </ButtonBase>
                );
            })}
        </Box>
    );
}

export default IconRail;
