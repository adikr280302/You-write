import {Route} from "react-router-dom";
import { Fragment} from "react";
import HomePage from "../components/HomePage/HomePage";
import Write from "../components/write/Write";
import EditUser from "../components/EditUser/EditUser";
import Written from "../components/Written/Written";
import Present from "../components/present/Present";

const Protected = (props)=>{
    return(
        <Fragment>
           

            <Route path="/write" exact>
                <Write/>
            </Route>

            <Route path="/user" exact>
                <EditUser/>
            </Route>

            <Route path="/writtens" exact>
                <Written/>
            </Route>

            <Route path="/write/:writtenId" exact>
            <Write edit={true}/>
            </Route>
            
            <Route path="/present/:writtenId" exact>
                <Present/>
            </Route>
            <Route path="/home" exact>
                <HomePage/>
            </Route>

        </Fragment>
    );
}

export default Protected;