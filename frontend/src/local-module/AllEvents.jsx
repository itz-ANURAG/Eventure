
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, TextField, Select, MenuItem, Box, Pagination, createTheme, ThemeProvider, Button } from '@mui/material';
import EventRegistrationForm from './EventRegistrationform';
// import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Navbar from './Navbar.jsx';

const AllEvents = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('getAllEvents', {
                    params: { search, sort, filter, page }
                });
                setEvents(response.data.events);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        fetchEvents();
    }, [search, sort, filter, page]);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#7B3F00', // reddish brown
            },
        },
    });

    const handleOpen = (event) => {
        setSelectedEvent(event);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedEvent(null);
    };

    return (
        <>
         <Navbar />
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: 2, background: '#4b2e2e', minHeight: '100vh' }}>
                <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <TextField
                        placeholder="Search"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        InputProps={{
                            disableUnderline: true,
                            sx: { '& input::placeholder': { opacity: 1 } },
                        }}
                    />
                    <Select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                    >
                        <MenuItem value="">Sort By</MenuItem>
                        <MenuItem value="eventName">Name</MenuItem>
                        <MenuItem value="eventDate">Date</MenuItem>
                        <MenuItem value="eventPrice">Price</MenuItem>
                    </Select>
                    <TextField
                        placeholder='Max Price'
                        variant="outlined"
                        type="number"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        InputProps={{
                            disableUnderline: true,
                            sx: { '& input::placeholder': { opacity: 1 } },
                        }}
                    />
                </Box>
                <Grid container spacing={2}>
                    {events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event._id}>
                            <Card 
                                sx={{ 
                                    height: '100%', 
                                    backgroundColor: '#8B4513', 
                                    color: 'white', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s', 
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                                        backgroundColor: '#A0522D' // Change to a lighter brown on hover
                                    } 
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{ height: 200, width: '100%', objectFit: 'cover' }} 
                                    image={event.eventBanner || 'https://via.placeholder.com/150'}
                                    alt={event.eventName}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {event.eventName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {event.eventDescription}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Date: {new Date(event.eventDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: ${event.eventPrice}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                                    <Button variant="contained" sx={{ backgroundColor: 'white', color: 'black', fontFamily: 'MedievalSharp' }} onClick={() => handleOpen(event)}>Register Now</Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                        sx={{ '& .MuiPaginationItem-root': { color: 'white' } }}
                    />
                </Box>
                {selectedEvent && (
                    <EventRegistrationForm 
                        open={open} 
                        handleClose={handleClose} 
                        event={selectedEvent} 
                    />
                )}
            </Box>
        </ThemeProvider>
        <Footer className="footer" />
        </>
    );
};

export default AllEvents;

