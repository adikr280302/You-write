import classes from './HomePage.module.css';
import pageVariants from '../../util/pageVariant';
import {motion} from 'framer-motion';
import mainTextVariants from '../../util/mainTextVariants';
import textVariants from './textVariants';
import {useHistory} from 'react-router-dom';
function HomePage(){
    const history = useHistory();

    const writeHandler = ()=>{
        history.replace('/write');
    }
    const writtensHandler = ()=>{
        history.replace('/writtens');
    }
    return(
        <motion.div
            className={classes.container}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="hidden_exit"
            >

            <motion.h1 
                className={classes.text}
                variants={mainTextVariants}
                >
                What's On Your Mind????
            </motion.h1>
            <div className={classes.btn_container}>
                <motion.button 
                    className={classes.btn}
                    onClick={writeHandler}
                    variants={textVariants}
                    animate="colorAnimation"
                    >
                    Write New
                </motion.button>
                <motion.button 
                    className={classes.btn}
                    onClick={writtensHandler}
                    variants={textVariants}
                    animate="colorAnimation"
                    >
                    View Old
                </motion.button>
            </div>
            <motion.h1 
                className={classes.text}
                variants={mainTextVariants}
                >
                Or Just Chill.................
            </motion.h1>
        </motion.div>
        
    );
}
export default HomePage;