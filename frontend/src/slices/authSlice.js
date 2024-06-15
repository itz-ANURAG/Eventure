import {createSlice} from "@reduxjs/toolkit";

const initialState={
    // token: localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
    // token: localStorage.getItem("token") || null,
    token:null,
    loading:false
};

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload;
            // localStorage.setItem("token", value.payload);
        },
        setLoading(state,value){
            state.loading=value.payload;
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem("token");
        }
    },
});

export const {setToken,setLoading,clearToken}=authSlice.actions;
export default authSlice.reducer;