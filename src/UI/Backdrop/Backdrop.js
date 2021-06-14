import classes from './Backdrop.module.css';
import { CSSTransition } from 'react-transition-group';

function Backdrop(props){
    return(
        <CSSTransition
            in={props.toShow}
            timeout={500}
            classNames={{
                enter: classes.backdrop_enter,
                enterActive: classes.backdrop_enter__active,
                exit: classes.backdrop_exit,
                exitActive: classes.backdrop_exit__active
                }}
            mountOnEnter
            unmountOnExit>
            <div className={classes.backdrop}></div>
        </CSSTransition>
    );
}
export default Backdrop;