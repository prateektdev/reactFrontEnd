import React from 'react';
import {  Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers'; 
import { PrivateRoute } from '../_components'; 
import { LoginPage } from '../LoginPage';
import { SignUpPage } from '../SignUpPage'; 
import { Book } from '../Book';  
import { alertActions } from '../_actions';
import { AddBook } from '../AddBook';
import { EditBook } from '../EditBook/EditBook';
import { StockBook } from '../StockBook/StockBook';

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
                <div  >
                    
                    { alert!=undefined?alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>:""
                    }
                    <Router history={history}>
                        <div>
                            <PrivateRoute exact path="/" component={Book} /> 
                            <PrivateRoute exact path="/outofstock" component={StockBook} /> 
                            <PrivateRoute exact path="/dashboard" component={Book} /> 
                            <PrivateRoute exact path="/addbook" component={AddBook} />    
                            <PrivateRoute exact path="/editbook" component={EditBook} />    
                            <Route path="/login" component={LoginPage} />
                            <Route path="/signup" component={SignUpPage} />   
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
