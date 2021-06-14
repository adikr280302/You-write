import authSlice from './auth-slice';
import uiSlice from './ui-slice';
import {configureStore} from '@reduxjs/toolkit';


const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        ui:uiSlice.reducer
    }
});


export default store;