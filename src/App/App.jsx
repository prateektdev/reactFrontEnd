import React from 'react';
import {  Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers'; 
import { PrivateRoute } from '../_components'; 
import { LoginPage } from '../LoginPage'; 
import { Roles } from '../Roles';  
import { alertActions } from '../_actions';
import { AddRole } from '../AddRole'; 

//import { Users } from '../Users';
// import { Activation } from '../Activation';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });  
    }

    render() {
        const { alert } = this.props;
        return (
            <div  >
                <div>
                    
                    { alert!=undefined?alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>:""
                    }
                    <Router history={history}>
                        <div>
                            <PrivateRoute exact path="/" component={Roles} />  
                            <PrivateRoute exact path="/dashboard" component={Roles} /> 
                            <PrivateRoute exact path="/addrole" component={AddRole} />     
                            <Route path="/login" component={LoginPage} />
                        </div>
                    </Router> 
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
