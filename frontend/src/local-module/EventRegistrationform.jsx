import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import {setLoading} from "../slices/authSlice"
import Spinner from "./Spinner"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const EventRegistrationForm = ({ open, handleClose, event }) => {

    const dispatch=useDispatch();
  const loading =useSelector((state)=>(state.auth.loading))
    
    const navigate = useNavigate();
    const [formData,setFormData]=useState({
        username:"",
        email:"",
        phone:"",
    })
 
     const  handleChange=(event)=>{
        const { name, value } = event.target;
        // Handle form field changes
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
     }    

    //  to handle razorpay test mode payment
     const handleSubmit = async (e) => {
        e.preventDefault();
        const price = event.eventPrice;
        dispatch(setLoading(true));
        try {
            const { data: { key } } = await axios.get("/getKey");
            const { data: { order } } = await axios.post("/createorder", { price });
    
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "ANURAG GUPTA",
                description: "RAZORPAY GATEWAY",
                image: "https://downloadscdn6.freepik.com/1142/51/50994.jpg?filename=3d-render-little-boy-with-eyeglasses-blue-shirt.jpg&token=exp=1718800072~hmac=035061d8a1a68f0880e99d560b206ca9",
                order_id: order.id,
                handler: async (response) => {
                    try {
                        const result = await axios.post("/paymentverification", response); // Ensure the correct URL
                        if (result.data.success) {
                            const eventRegisterResponse = await axios.post('/eventRegister', { formData, event });
                            if (eventRegisterResponse.data.success) {
                                toast.success(`Registered for ${event.eventName}! Successfully`);
                                navigate(eventRegisterResponse.data.path);
                            } else {
                                toast.error('Failed to create event internal server error');
                                navigate(eventRegisterResponse.data.path);
                            }
                        } else {
                            toast.error('Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Error during payment verification', error);
                        toast.error('Payment verification failed');
                    }
                    handleClose();
                },
                prefill: {
                    name: `${formData.username}`,
                    email: `${formData.email}`,
                    contact: `${formData.phone}`,
                },
                notes: {
                    "address": "razorpay corporate office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error('Error registering for event', error);
            toast.error('Registration failed, please login first');
            navigate("/");
        }
        dispatch(setLoading(false));
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                { loading?<Spinner/>:(
                <Box sx={style}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Register for {event.eventName}
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        {/* <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}> */}
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Checkout
                        </Button>
                    </form>
                </Box>
                )
               }
            </Modal>
        </div>
    );
};

export default EventRegistrationForm;
