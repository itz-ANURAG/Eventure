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
  const {loading} =useSelector((state)=>(state.auth.loading))
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true))
        try {
            console.log(event);
            const response = await axios.post('/eventRegister', {formData,event});
            if (response.data.success) {
                toast.success(`Registered for ${event.eventName}! Successfully`);
                navigate(response.data.path);

            } else {
                toast.error('Failed to create event internal server error');
                navigate(response.data.path)
            }
            handleClose();
        } catch (error) {
            console.error('Error registering for event', error);
            toast.error('Registration failed ,plz Login first');
            navigate("/")

        }
        dispatch(setLoading(false))
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
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Submit
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
