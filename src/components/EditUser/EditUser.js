import {useEffect, useState } from 'react';
import classes from './EditUser.module.css';
import isEmail from 'validator/lib/isEmail';
import isName from '../../util/isName';
import isPass from '../../util/isPass';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {uiActions} from '../../store/ui-slice';
import useInput from '../../hooks/use-input';
import {motion} from 'framer-motion';
import pageVariants from '../../util/pageVariant';
import { useHistory } from 'react-router-dom';

const isConfirmPass = (pass,confrimPass)=>{
    if(pass===confrimPass)  return true;
    else    return false;
}


function EditUser(){
    
    const token = useSelector(state=>state.auth.token);
    const {value:email,
        isValid:isEmailValid,
        changeValueHandler:changeEmailHandler,
        inputBlurHandler : emailBlurHandler} = useInput(isEmail);

    const {value:pass,
            isValid:isPassValid,
            changeValueHandler:changePassHandler,
            inputBlurHandler:passBlurHandler} = useInput(isPass);

    const {value:name,
        isValid:isNameValid,
        changeValueHandler:changeNameHandler,
        inputBlurHandler:nameBlurHandler} = useInput(isName);

    const [confirmPass,setConfirmPass] = useState("");
    const isConfirmPassValid = isConfirmPass(pass,confirmPass);

    const dispatch = useDispatch();
    
    const changeConfirmPassHandler = (event)=>{
        setConfirmPass(event.target.value);
    }
    
    

    const history = useHistory()
    const submitHandler = () => {
        const _email = email.trim();
        const _name = name.trim();
        const _pass = pass.trim();
        
        if(!isName(_name)){
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Sorry",message:"Name is too short :("}));
            return;
        }

        if(!isEmail(_email)){
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Sorry",message:"Enter Valid Email :("}));
            return;
        }

        if(!isPass(_pass)){
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Sorry",message:"Password is too short :("}));
            return;
        }

        if(!isConfirmPassValid){
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Sorry",message:"Passwords mismatched :("}));
            return;
        }

        dispatch(uiActions.showBackdrop());
        dispatch(uiActions.showLoading());
        const reqConfig = {
            method: 'POST',
            url: 'https://you-write.herokuapp.com/auth/edit',
            data:{email:_email,
                    name:_name,
                    password:_pass},
                    headers: {'Authorization': `Bearer ${token}`
                }
        }
       axios(reqConfig)
        .then(res=>{
            if(res.status!==200){
                const err = new Error("Signup Failed");
                throw err;
            }
            dispatch(uiActions.removeUI());
            history.replace("/");
        })
        .catch(err=>{
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Sorry",message:"Try again Later :("}));
            return;
        })

    }


    useEffect(()=>{
        if(!token){
            return;
        }
        dispatch(uiActions.showBackdrop());
        dispatch(uiActions.showLoading());
        const reqConfig = {
            method:'GET',
            url: `https://you-write.herokuapp.com/auth/user`,
            headers: {'Authorization': `Bearer ${token}`}
        };

        axios(reqConfig)
        .then(res=>{
            if(res.status!==200){
                const err = new Error("Failed To Get User!");
                throw err;
            }
            const user = res.data.user;
            
            //WORK AROUND TO CHANGE USERNAME AND EMAIL
            const event ={target:{value:user.name}};
            changeNameHandler(event);
            event.target.value = user.email;
            changeEmailHandler(event);
            dispatch(uiActions.removeUI());
        })
        .catch(err=>{
            dispatch(uiActions.removeUI());
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Sorry",message:"Can't Fetch :("}));
        })
        
    },[token,dispatch,changeNameHandler,changeEmailHandler]);

    const keyPressHandler =(event)=>{
        if(event.key==='Enter')
            submitHandler();
    };

    return(
        <motion.div
            className={classes.outer_container}
            variant={pageVariants}
            initial="hidden"
            animate="visible"
            exit="hidden_exit"
            >
            <h1 className={classes.youwrite}>YOU WRITE!</h1>
            <div className={classes.container}>
                <h1 className={classes.heading}>YOU</h1>
                
                <input  className={`${classes.input} ${(isNameValid)? "": classes.invalid}`}
                    onChange={changeNameHandler} 
                    onBlur={nameBlurHandler}  
                    value={name}
                    placeholder="Name" 
                    type="text"
                    onKeyPress={keyPressHandler}/>

                <input  className={`${classes.input} ${(isEmailValid)? "": classes.invalid}`}
                    onChange={changeEmailHandler} 
                    onBlur={emailBlurHandler}  
                    value={email}
                    placeholder="Email" 
                    type="email"
                    onKeyPress={keyPressHandler}/>
                        
                <input className={`${classes.input} ${(isPassValid)? "": classes.invalid}`}
                    onChange={changePassHandler}
                    onBlur={passBlurHandler} 
                    value={pass} 
                    placeholder="Password" 
                    type="password"
                    onKeyPress={keyPressHandler}/>
                
                <input 
                    value={confirmPass} 
                    className={classes.input} 
                    onChange={changeConfirmPassHandler} 
                    placeholder="Confirm Password" 
                    type="password"
                    onKeyPress={keyPressHandler}
                />

                <button 
                    onClick={submitHandler} 
                    className={classes.btn}>
                        SAVE
                </button>

            </div>
        </motion.div>
    );
}

export default EditUser;