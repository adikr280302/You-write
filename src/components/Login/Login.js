import  isPass from '../../util/isPass';
import classes from './Login.module.css';
import isEmail from 'validator/lib/isEmail';
import{useDispatch, useSelector} from 'react-redux';
import {loginRequestHandler} from '../../store/auth-actions';
import {uiActions} from '../../store/ui-slice';
import useInput from '../../hooks/use-input';
import { Link } from 'react-router-dom';
import pageVariants from '../../util/pageVariant';
import {motion} from 'framer-motion';
import mainTextVariants from '../../util/mainTextVariants';
import {useHistory} from 'react-router-dom';

function Login(){
    
    const {value:email,
        isValid:isEmailValid,
        changeValueHandler:changeEmailHandler,
        inputBlurHandler : emailBlurHandler} = useInput(isEmail);

    const {value:pass,
        isValid:isPassValid,
        changeValueHandler:changePassHandler,
        inputBlurHandler:passBlurHandler} = useInput(isPass);

    const dispatch = useDispatch();
    const history = useHistory()
    const isAuth = useSelector(state=>state.auth.isLogin);
    const submitHandler = () => {
        const _email = email.trim();
        const _pass = pass.trim();
        if(!isEmailValid){
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Sorry",message:"Enter Valid Email :("}));
            return;
        }

        if(!isPassValid){
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Sorry",message:"Password is too short :("}));
            return;
        }

        dispatch(loginRequestHandler({email:_email,pass:_pass}));
        if(isAuth){
            history.replace('/home');
        }
    }

    
    const keyPressHandler =(event)=>{
        if(event.key==='Enter')
            submitHandler();
    };

    return(
        <motion.div className={classes.outer_container} 
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="hidden_exit"
            >
            
            <motion.div 
            
            className={classes.youwrite}
            variants={mainTextVariants}
            >
                YOU WRITE
            </motion.div>



            <div className={classes.container}>
                <h1 className={classes.heading}>LOGIN</h1>
                <input  className={`${classes.input} ${(isEmailValid)? "": classes.invalid}`}
                    onChange={changeEmailHandler} 
                    onBlur={emailBlurHandler} 
                    onKeyPress={keyPressHandler} 
                    value={email}
                    placeholder="Email" 
                    type="email"/>
                        
                <input className={`${classes.input} ${(isPassValid)? "": classes.invalid}`}
                    onChange={changePassHandler}
                    onBlur={passBlurHandler}
                    onKeyPress={keyPressHandler} 
                    value={pass} 
                    placeholder="Password" 
                    type="password"/>

                <button  
                    className={classes.btn} 
                    onClick={submitHandler}>
                        LOGIN
                </button>
                
                <Link className={classes.link} to="/signup" >
                    Don't Have Account?Create User
                </Link>
            </div>
        </motion.div>

    );
}

export default Login;