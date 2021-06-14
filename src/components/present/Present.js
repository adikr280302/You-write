import classes from './Present.module.css';
import {useParams,Link,useHistory} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import {uiActions} from '../../store/ui-slice';
import {motion} from 'framer-motion';
import pageVariants from '../../util/pageVariant';

function Present(props){
    const writtenId = useParams().writtenId;
    const token = useSelector(state=>state.auth.token);
    const [title,changeTitle] = useState("");
    const [mainText,changeMainText] = useState("");
    const [date,changeDate] = useState("");
    const [subject,changeSubject] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{

        dispatch(uiActions.showBackdrop());
        dispatch(uiActions.showLoading());
        if(!token){
            dispatch(uiActions.removeUI());
            return;
        }

        const reqConfig={
            method:'GET',
            url:`https://you-write.herokuapp.com/written/fetch/${writtenId}`,
            headers: {'Authorization': `Bearer ${token}`}
        };

        axios(reqConfig)
        .then(res=>{
            if(res.status!==200){
                const err = new Error("Failed To Fetch!");
                throw err;
            }
            const written = res.data.written;
            changeTitle(written.title);
            changeMainText(written.mainText);
            changeDate(new Date(written.date).toLocaleDateString());
            changeSubject(written.subject);
            dispatch(uiActions.removeUI());
        })
        .catch(err=>{
            dispatch(uiActions.removeUI());
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Sorry",message:"Can't Fetch :("}));
        })

    },[writtenId,dispatch,changeSubject,changeTitle,changeMainText,changeDate,token]);

    const deletePostHandler = ()=>{
        
        dispatch(uiActions.showBackdrop());
        dispatch(uiActions.showLoading());
        const reqConfig ={
            method:'POST',
            url:`https://you-write.herokuapp.com/written/delete/${writtenId}`,
            headers: {'Authorization': `Bearer ${token}`}
        } 
        axios(reqConfig)
        .then(res=>{
            if(res.status!==200){
                const err = new Error("Failed to delete!");
                throw err;
            }
            dispatch(uiActions.removeUI());
            history.replace("/writtens");

        })
        .catch(err=>{
            dispatch(uiActions.removeUI());
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Sorry",message:"Failed to Delete :("}));
        })
    }

    const confirmDeletePostHandler = ()=>{
        const confrimConfig = {
            title: "ARE YOU SURE?",
            message:"This deletion is permanent",
            toDo : deletePostHandler
        };
        dispatch(uiActions.showBackdrop());
        dispatch(uiActions.showConfirm(confrimConfig));
    }
    return(
        <motion.div
            className={classes.container}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="hidden_exit"
            >
            <h1 className={classes.title}>{title}</h1>
            <div className={classes.date}>{date}</div>
            <div className={classes.subject}>{subject}</div>
            <p className={classes.maintext}>{mainText}</p>
            <div className={classes.button_container}>
                <Link className={classes.btn} to={`/write/${writtenId}`}> Edit</Link>
                <button 
                    onClick={confirmDeletePostHandler} 
                    className={classes.btn} > 
                    Delete 
                </button>
            </div>
        </motion.div>
    )
}
export default Present;