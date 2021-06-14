import classes from './Confirm.module.css';
import {useDispatch} from 'react-redux';
import {uiActions} from '../../store/ui-slice';
import { CSSTransition } from 'react-transition-group';

function Modal(props){
    const dispatch = useDispatch();
    const removeUiHandler = ()=>{
        dispatch(uiActions.removeUI());
    }
    const okHandler = () =>{
        props.toDo();
        dispatch(uiActions.removeUI());
    }
    return(
        <CSSTransition
        in={props.toShow}
        timeout={500}
        classNames={{
            enter: classes.modal_enter,
            enterActive: classes.modal_enter__active,
            exit: classes.modal_exit,
            exitActive: classes.modal_exit__active
            }}
        mountOnEnter
        unmountOnExit>
            <div className={classes.container}>
                <div className={classes.modal}>
                    <h2 className={classes.title}>{props.title}</h2>
                    <div className={classes.message}>{props.message}</div>
                    <div className={classes.btn_container}>
                        <button onClick={removeUiHandler} className={classes.btn}>Cancel</button>
                        <button onClick={okHandler} className={classes.btn}>OK</button>
                    </div>
                </div>

            </div>
        </CSSTransition>
    );
}

export default Modal;