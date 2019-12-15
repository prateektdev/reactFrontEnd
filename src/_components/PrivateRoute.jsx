import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//alert(localStorage.getItem('user'));

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)