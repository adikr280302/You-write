import {createSlice} from '@reduxjs/toolkit';

const initialState = {toShowBackdrop:false,
            toShowLoading:false,
                toShowModal:false,
                    modalMessage:{
                        title:"",
                        message:""
                    },
                        toShowConfirm:false,
                            confirmConfig:{
                                title:"",
                                message:"",
                                toDo: null
                            }};


const uiSlice = createSlice({
    name:'ui',
    initialState,
    reducers:{
        showBackdrop(state){
            state.toShowBackdrop = true;
        },
        showLoading(state){
            state.toShowLoading = true;
        },
        showModal(state,action){
            state.toShowModal = true;
            state.modalMessage = action.payload; 
        },
        showConfirm(state,action){
            state.toShowConfirm = true;
            state.confirmConfig = action.payload;
        },
        removeUI(state){
            state.toShowBackdrop = false;
            state.toShowModal = false;
            state.toShowLoading = false;
            state.modalMessage = initialState.modalMessage;
            state.toShowConfirm = false;
            state.confirmConfig = initialState.confirmConfig;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;