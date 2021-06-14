import { useDispatch } from 'react-redux';
import {uiActions} from '../../store/ui-slice';
import { useState } from 'react';
import axios from 'axios';
import classes from './Signup.module.css';
import isEmail from 'validator/lib/isEmail';
import isPass from '../../util/isPass';
import isName from '../../util/isName';
import useInput from '../../hooks/use-input';
import pageVariants from '../../util/pageVariant';
import {motion} from 'framer-motion';
import {useHistory} from 'react-router-dom';


const isConfirmPass = (pass,confrimPass)=>{
    if(pass===confrimPass)  return true;
    else    return false;
}

function Signup(){
    
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
    const history = useHistory();

    const changeConfirmPassHandler = (event)=>{
        setConfirmPass(event.target.value);
    }
    
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
            url: 'https://you-write.herokuapp.com/auth/signup',
            data:{email:_email,name:_name,password:_pass}
        }

        axios(reqConfig)
        .then(res=>{
            if(res.status===422){
                const err = new Error("Email address already exist");
                throw err;
            }
            if(res.status!==201){
                const err = new Error("Signup Failed");
                throw err;
            }
            dispatch(uiActions.removeUI());
            history.push('/');
        })
        .catch(err=>{
            dispatch(uiActions.showBackdrop());
            const msg = err.message.split(" ");
            if(msg[msg.length-1]==="422"){
                dispatch(uiActions.showModal({title:"Sorry",message:"Email already exists :("}));
            }
            else{
                dispatch(uiActions.showModal({title:"Sorry",message:"Try again later :("}));
            }
            return;
        })

    }

    const keyPressHandler =(event)=>{
        if(event.key==='Enter')
            submitHandler();
    };

    return(
        <motion.div
            className={classes.outer_container}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="hidden_exit"
                >

            <h1 className={classes.youwrite}>YOU WRITE!</h1>
            <div className={classes.container}>
                <h1 className={classes.heading}>SIGNUP</h1>
                
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
                    onKeyPress={keyPressHandler}/>
                
                <button 
                    onClick={submitHandler} 
                    className={classes.btn}>
                        SIGNUP
                </button>

            </div>
        </motion.div>
    );
}

export default Signup;