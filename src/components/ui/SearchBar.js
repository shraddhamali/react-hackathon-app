import React, { useState } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Menu,
    MenuItem,
    Chip
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';

function SearchBar({ placeholder = "Type keyword to find your search...", onSearch, onFilterChange }) {
    const [searchValue, setSearchValue] = useState('');
    const [filterAnchor, setFilterAnchor] = useState(null);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    const handleFilterClick = (event) => {
        setFilterAnchor(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchor(null);
    };

    const handleFilterSelect = (filter) => {
        if (onFilterChange) {
            onFilterChange(filter);
        }
        handleFilterClose();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
                value={searchValue}
                onChange={handleSearch}
                placeholder={placeholder}
                variant="outlined"
                size="small"
                sx={{
                    minWidth: 320,
                    '& .MuiOutlinedInput-root': {
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        '& fieldset': {
                            borderColor: 'rgba(229, 231, 235, 0.8)',
                        },
                        '&:hover fieldset': {
                            borderColor: '#1E88E5',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1E88E5',
                            borderWidth: 2,
                        },
                    },
                    '& .MuiInputBase-input': {
                        fontSize: '14px',
                        color: '#0F172A',
                        '&::placeholder': {
                            color: '#475569',
                            opacity: 1,
                        },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search sx={{ color: '#475569', fontSize: 20 }} />
                        </InputAdornment>
                    ),
                }}
            />

            <Chip
                label="Filter"
                icon={<FilterList sx={{ fontSize: 16 }} />}
                onClick={handleFilterClick}
                sx={{
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(229, 231, 235, 0.8)',
                    color: '#475569',
                    fontSize: '13px',
                    fontWeight: 500,
                    '&:hover': {
                        backgroundColor: '#E3F2FD',
                        borderColor: '#1E88E5',
                        color: '#1565C0',
                    },
                    '& .MuiChip-icon': {
                        color: 'inherit',
                    },
                }}
            />

            <Menu
                anchorEl={filterAnchor}
                open={Boolean(filterAnchor)}
                onClose={handleFilterClose}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        mt: 1,
                        boxShadow: '0 10px 24px rgba(2, 6, 23, 0.1)',
                    }
                }}
            >
                <MenuItem onClick={() => handleFilterSelect('all')}>All Patients</MenuItem>
                <MenuItem onClick={() => handleFilterSelect('active')}>Active Cases</MenuItem>
                <MenuItem onClick={() => handleFilterSelect('urgent')}>Urgent</MenuItem>
                <MenuItem onClick={() => handleFilterSelect('recent')}>Recent Visits</MenuItem>
            </Menu>
        </Box>
    );
}

export default SearchBar;
