import classes from './Write.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {useParams,Prompt,useHistory} from 'react-router-dom';
import {uiActions} from '../../store/ui-slice';
import {motion} from 'framer-motion';
import pageVariants from '../../util/pageVariant';



function   Write (props){

    let editing = false;
    const [isTouched,setTouched] = useState(false);
    const history = useHistory();
    if(props.edit){
        editing = true;
    }

    const dispatch = useDispatch();
    const writtenId = useParams().writtenId;

    const token = useSelector(state=>state.auth.token);
    
    const currDate = new Date().toISOString();
    
    const [title,changeTitle] = useState("");
    const [mainText,changeMainText] = useState("");
    const [subject,changeSubject] = useState("");


    const submitHandler = (event)=>{
        event.preventDefault();
        
          
        const title_  = event.target.title.value.trim();        
        const date_  = currDate.trim();
        const subject_  = event.target.subject.value.trim();
        const mainText_  = event.target.mainText.value.trim();


        if(title_.length===0 ||
            date_.length===0||
            subject_.length===0||
            mainText_.length===0){
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Sorry",message:"Something is missing!"}));
        }
        else{
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showLoading());
            let reqConfig ={
                method:'post',
                headers: {'Authorization': `Bearer ${token}`},
                data: {title:title_,date:date_,subject:subject_,mainText:mainText_},
            };
            
            if(!editing){
                reqConfig.url= 'https://you-write.herokuapp.com/written/save';
            }
            else{
                reqConfig.url= 'https://you-write.herokuapp.com/written/edit';
                reqConfig.data._id=writtenId;
            }
                
            axios(reqConfig)
            .then(res=>{
                if(res.status!==201){
                    const err = new Error("Unable to save");
                    throw err;
                }
                setTouched(false);
                dispatch(uiActions.removeUI());
                history.replace("/writtens");
            })
            .catch(err=>{
                dispatch(uiActions.removeUI());
                dispatch(uiActions.showBackdrop());
                dispatch(uiActions.showModal({title:"Sorry",message:"Can't Save :("}));
            });
            
        }
    }

    useEffect(()=>{
        dispatch(uiActions.showBackdrop());
        dispatch(uiActions.showLoading());
        if(!editing || !token){
            dispatch(uiActions.removeUI());
            return;
        }

        const reqConfig={
            method:'GET',
            url:`https://you-write.herokuapp.com/written/fetch/${writtenId}`,
            headers: {'Authorization': `Bearer ${token}`}
        }


        axios(reqConfig)
        .then(res=>{
            if(res.status!==200){
                const err = new Error("Failed To Get Written!");
                console.log(res);
                throw err;
            }
            const written = res.data.written;
            changeTitle(written.title);
            changeMainText(written.mainText);
            changeSubject(written.subject);
            dispatch(uiActions.removeUI());
        })
        .catch(err=>{
            dispatch(uiActions.removeUI());
            dispatch(uiActions.showBackdrop());
            dispatch(uiActions.showModal({title:"Sorry",message:"Can't Fetch :("}));
        });
        
    },[token,dispatch,editing,writtenId]);

    useEffect(()=>{
        if (isTouched) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    },[isTouched])

    const onFocusHandler = ()=>{
        setTouched(true);
    }

    return(
        
        <motion.div 
            className={classes.container}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="hidden_exit"
            >

            <Prompt 
                when={isTouched} 
                message="Are you sure? All the data will be lost :("/>
            
            <form 
                onFocus={onFocusHandler} 
                onSubmit={submitHandler} 
                className={classes.formcontrol}>
                
                <textarea 
                    className={classes.date} 
                    defaultValue={`${new Date().toLocaleDateString()}`} 
                    readOnly 
                    id="date" 
                    name="date" 
                    rows="1">
                </textarea>
                
                <textarea 
                    className={classes.title} 
                    defaultValue={title} 
                    required 
                    placeholder="Enter Title" 
                    id="title" 
                    name="title" 
                    rows="1">
                </textarea>
                
                <textarea 
                    className={classes.subject} 
                    defaultValue={subject} 
                    required 
                    placeholder="Subject" 
                    id="subject" 
                    name="subject" 
                    rows="2">
                </textarea>
                
                <textarea 
                    className={classes.main_text} 
                    defaultValue={mainText} 
                    required 
                    id="mainText" 
                    name="mainText" 
                    rows="50" 
                    placeholder="Main Text">
                </textarea>
                
                <button 
                    className={classes.btn} 
                    type="submit" >
                        Save
                </button>

            </form>

        </motion.div>
        
    );
}

export default Write;