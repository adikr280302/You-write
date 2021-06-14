import timeGlass from '../../assets/images/loading.gif';
import classes from './Loading.module.css';
import { CSSTransition } from 'react-transition-group';
function Loading(props){

    return(
        <CSSTransition
            in={props.toShow}
            timeout={500}
            classNames={{
                enter: classes.loading_enter,
                enterActive: classes.loading_enter__active,
                exit: classes.loading_exit,
                exitActive: classes.loading_exit__active
                }}
            mountOnEnter
            unmountOnExit>
        
            <div className={classes.loading_container}> 
                <img src={timeGlass} alt={"loading"}/>
            </div>
        </CSSTransition>
    );    


}


export default Loading;