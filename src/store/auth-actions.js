import axios from 'axios';
import {authActions} from './auth-slice';
import {uiActions} from './ui-slice';

export const autoLogoutHandler = (expiryDate)=>{
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(authActions.logout());
        },expiryDate.getTime()-new Date().getTime());
    }
};


export const  loginRequestHandler = (userDetails)=>{

    return (dispatch)=>{

        const email = userDetails.email;
        const pass = userDetails.pass;
        dispatch(uiActions.showBackdrop());
        dispatch(uiActions.showLoading());
        axios.post('https://you-write.herokuapp.com/auth/login',
                                        {email:email,
                                        password:pass})
        .then(res=>{
            if(res.status!==200){
                const error = new Error("Authentication Failed!");
                throw error;
            }

            return res;
        })
        .then(res=>{
            dispatch(authActions.login({userId:res.data.userId,token:res.data.token}));
            dispatch(autoLogoutHandler(new Date(localStorage.getItem('expiryDate#yw'))));
            dispatch(uiActions.removeUI());
        })
        .catch(err=>{
            dispatch(uiActions.removeUI());
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Invalid Username or Password",message:"Authentication Failed"}));
        });

    } 

}

export const autoLoginHandler = ()=>{
    return  (dispatch)=>{
        const token = localStorage.getItem('token#yw');
        const userId = localStorage.getItem('userId#yw');
        let expiryDate = localStorage.getItem('expiryDate#yw');
        if(!token || !userId || !expiryDate){
            return;
        }
        expiryDate = new Date(expiryDate);
        if(new Date() < expiryDate){
            dispatch(authActions.login({userId:userId,token:token}));
        }
        localStorage.setItem('expiryDate#yw',expiryDate.toISOString());
        dispatch(autoLogoutHandler(new Date(localStorage.getItem('expiryDate#yw'))));
    }
};

