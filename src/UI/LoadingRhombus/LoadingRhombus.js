import classes from './LoadingRhombus.module.css';
import Rhombus from '../../assets/images/rhombus.gif';
const LoadingRhombus = ()=>{
    return(<div className={classes.loading_container}> 
        <img src={Rhombus} alt={"loading"}/>
    </div>);
}

export default LoadingRhombus;