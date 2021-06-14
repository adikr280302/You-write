import classes from './Written.module.css';
import Item from './item/Item';
import {useRef, useState,useCallback } from 'react';
import useWrittenSearch from '../../hooks/use-writtenSearch';
import LoadingRhombus from '../../UI/LoadingRhombus/LoadingRhombus';
import {AnimatePresence,motion} from 'framer-motion';
import pageVariants from '../../util/pageVariant';
import itemsVariants from './itemsVariants';

function Written(){

    const [subject,setSubject]  = useState('');
    const [page,setPage] = useState(1);
    
    const {writtens,error,hasMore,loading} = useWrittenSearch(subject,page)
    
    
    const observer = useRef();

    const lastWrittenReference = useCallback((node)=>{
        if(loading)     return;
        if(observer.current)    observer.current.disconnect();
        observer.current = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting && hasMore)
                setPage(page=>page+1);
        })
        if(node)    observer.current.observe(node);
    },[loading,hasMore]);
    
    const changeSubjectHandler = (event)=>{
        setSubject(event.target.value);
        setPage(1);
    }
    
    return(
        <motion.div 
            className={classes.outer_container}
            variants={pageVariants}
            initial="hidden"
            animate = "visible"
            exit = "hidden_exit"
            >
            <h1 className={classes.text}>Things You Have Written In The Past</h1>
            
            
            <input className={classes.input} 
                onChange={changeSubjectHandler} 
                type="text" 
                placeholder="search"/>
            
            <div className={classes.items}>
                <AnimatePresence exitBeforeEnter>
                {writtens.map((written,index)=>{
                    if(index+1 === writtens.length){
                        return (
                            <motion.div variants={itemsVariants} 
                                initial="hidden" 
                                animate="visible" 
                                exit="hidden"> 
                                
                                <Item title={written.title} 
                                    date = {written.date}
                                    desc={written.subject}
                                    _id ={written._id}
                                    key={written._id}>
                                </Item>
                            </motion.div>);
                    }
                    else{
                        return (
                            <motion.div 
                                variants={itemsVariants} 
                                initial="hidden" 
                                animate="visible" 
                                exit="hidden">
                                <Item title={written.title} 
                                date = {written.date}
                                desc={written.subject}
                                _id ={written._id}
                                key={written._id}>
                                </Item>
                            </motion.div>);
                        }
                    })
                }
                </AnimatePresence>
                { (writtens.length ===0) && <div> Nothing to Show </div>}
                {loading && <LoadingRhombus/>}
                {error && <div>error</div>}
                
                <div ref={lastWrittenReference} style={{opacity:'0'}}>end</div>
            </div>
        </motion.div>
    );
}
export default Written;