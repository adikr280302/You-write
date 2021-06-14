import {Fragment} from 'react';
import {Redirect, Route,Switch,useLocation} from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar';
import {autoLoginHandler} from './store/auth-actions';
import {useDispatch,useSelector} from 'react-redux'; 
import Backdrop from './UI/Backdrop/Backdrop';
import Loading from './UI/Loading/Loading';
import Modal from './UI/Modal/Modal';
import Confirm from './UI/Confirm/Confirm';
import Footer from './components/Footer/Footer';
import {AnimatePresence} from 'framer-motion';
import Protected from './routes/Protected';

function App() {
  
  const dispatch = useDispatch();
  dispatch(autoLoginHandler());
  
  const currLocation = useLocation();
  const isAuth = useSelector(state=>state.auth.isLogin);
  const showModal = useSelector(state=>state.ui.toShowModal);
  const showBackdrop= useSelector(state=>state.ui.toShowBackdrop);
  const modalMessage = useSelector(state=>state.ui.modalMessage);
  const showLoading = useSelector(state=>state.ui.toShowLoading);
  const showConfirm = useSelector(state=>state.ui.toShowConfirm);
  const confirmConfig = useSelector(state=>state.ui.confirmConfig);
  

  
  console.log(isAuth);

  return (
    <Fragment>
      
      <Modal/>
      <Loading toShow={showLoading}/>
      <Backdrop toShow={showBackdrop}/>
      <Confirm toShow={showConfirm} title={confirmConfig.title} message={confirmConfig.message} toDo={confirmConfig.toDo}/>
      <Modal toShow={showModal} title={modalMessage.title} message={modalMessage.message} />
      {isAuth && <Navbar/>}
      
      <AnimatePresence exitBeforeEnter>
        
        <Switch location={currLocation} key={currLocation.key}>
      
          <Route path="/" exact> 
            {isAuth && <Redirect to="/home"/>}
            {!isAuth && <Login/>}
          </Route>
          
          <Route path="/signup" exact>
            {isAuth && <Redirect to="/home"/>}
            <Signup/>
          </Route>

          {isAuth && <Protected/>}  
          
          <Route path="*">
            <Redirect to="/"/>
          </Route>

        </Switch>

      </AnimatePresence>
      <Footer/>

    </Fragment>
  );
}

export default App;
