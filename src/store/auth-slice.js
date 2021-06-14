import  {createSlice} from '@reduxjs/toolkit';
const initialState = {isLogin:false,userId:null,token:null};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login(state,action){
            state.isLogin = true;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            localStorage.setItem('token#yw',action.payload.token);
            localStorage.setItem('userId#yw',action.payload.userId);
            const remainingMilliseconds = 60*60*1000;
            const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
            localStorage.setItem('expiryDate#yw',expiryDate.toISOString());
        },
        logout(state){
            state.isLogin = false;
            state.userId = null;
            state.token = null;
            localStorage.removeItem('token#yw');
            localStorage.removeItem('expiryDate#yw');
            localStorage.removeItem('userId#yw'); 
            console.log("aditya");
        } 
    }
});

export const authActions = authSlice.actions;




export default authSlice;