import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setToken } from '../slices/authSlice';
import {toast} from 'react-hot-toast'

const GoogleCallback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} =useParams();
    useEffect(() => {
        if (token) {
            dispatch(setToken(token));
            toast.success("signed in successfully")
            navigate('/my-profile');
        } else {
            navigate('/signin');
        }
    }, [dispatch, navigate]);

    return <div>Loading...</div>;
};

export default GoogleCallback;