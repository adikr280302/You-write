import { Fragment, useState } from "react";
import classes from "./Navbar.module.css";
import Person from '@material-ui/icons/Person';
import {authActions} from '../../store/auth-slice';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {motion,AnimatePresence} from 'framer-motion';

function Navbar(){
    const navBarVariant={
        hidden:{
            opacity:0,
            y:-100
        },
        visible:{
            opacity:1,
            y:0,
            transition:{
                type:'spring',
                delay:0.5,
                duration:1
            }
        }

    }
    const sliderVariant = {
        hidden:{
            opacity:0,
            x:100
        },
        visible:{
            opacity:1,
            x:0
        },
        hidden_exit:{
            opacity:0,
            x:100,
            transition:{
                type:'tween'
            }
        }

    }
    
    const dispatch = useDispatch();
    const [showSlider,toggleSlider] =useState(false);
    const closeSliderHandler = ()=>{
        toggleSlider(false);
    }
    const openSliderHandler = ()=>{
        toggleSlider(true);
    }
   
    const logoutHandler = ()=>{
        dispatch(authActions.logout());
    }

    return(
        <Fragment>
            <AnimatePresence>
                <motion.nav 
                    className={classes.nav}
                    variants={navBarVariant}
                    initial ="hidden"
                    animate="visible"
                        >
                    <div className={classes.container}>
                        <div className={classes.youwrite}>Your Writings</div>
                        <button onBlur={closeSliderHandler}  
                            className={classes.profile}
                            onClick={openSliderHandler}>
                                
                            <div className={classes.icon}>
                                <Person fontSize='inherit' /> 
                            </div>
                        </button>
                    </div>
                    
                </motion.nav>
            </AnimatePresence>

            <AnimatePresence>    
                {showSlider &&     
                <motion.div  
                    className={classes.slider}
                    variants={sliderVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden_exit"
                    >

                    <div className={classes.slideritems}>
                        <Link to="/user" 
                            className={classes.sliderItem}> 
                            Your Account 
                        </Link>
                        
                        <Link to="/writtens" 
                            className={classes.sliderItem}> 
                            Writtens
                        </Link>

                        <Link 
                            to="/write" 
                            className={classes.sliderItem}> 
                            Write New 
                        </Link>

                        <button 
                            onClick={logoutHandler} 
                            className={classes.sliderItem}>
                                Sign Out
                        </button>
                        
                        <button 
                            onClick={closeSliderHandler} 
                            className={classes.sliderItem}>
                                Cancel
                        </button>

                    </div>
                </motion.div>}
            </AnimatePresence>
        </Fragment>
    );

}

export default Navbar;