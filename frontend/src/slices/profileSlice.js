import {createSlice} from "@reduxjs/toolkit";

// loadint initial states of profile slice
const initialState={
    user:null,
};

const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        //  function to deal with slices
        setUser(state,value){
            state.user=value.payload;
        },
    },
});

// exporting required functionalities
export const {setUser}=profileSlice.actions;
export default profileSlice.reducer;