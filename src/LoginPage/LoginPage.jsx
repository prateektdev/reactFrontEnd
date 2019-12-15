import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, bookActions } from '../_actions';
import Footer from '../Footer/Footer';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props; 
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div>
            <main className="sign_wrapper">	  
            <div className="signIn-sec">
                <div className="signIn-sec">
                    <div className="container">
                        <div className="form-boxs">
                            <form className="theme-form" onSubmit={this.handleSubmit}>
                                <div className="form-heading">
                                  
                               
                                </div>
                                <div className="form-body">
                                <div className="form-group">
                                        <div className="theme_input_group">
                                            <input  value={this.state.username} onChange={this.handleChange} name="username" className="form-control" id="inputEmail" placeholder="Username" />
                                            <span className="field-icon"><i className="fa fa-user" aria-hidden="true"></i></span>
                                            {submitted && !username &&
                                                <div className="help-block error">User name is required</div>
                                            }
                                        </div>
                                    </div>  

                                    <div className="form-group">
                                        <div className="theme_input_group">
                                                <input type="password" value={this.state.password} onChange={this.handleChange} name="password" className="form-control" id="inputPassword" placeholder="Password" />
                                                <span className="field-icon"><i className="fa fa-key" aria-hidden="true"></i></span>
                                                {submitted && !password &&
                                                    <div className="help-block error">Password is required</div>
                                                }
                                        </div>
                                    </div> 

                                    <div className="log_usr_action"> 
                                    </div>

                                    <div className="form-submit sign_submit">
                                    <button type="submit" className="btn btn-theme btn-block"> Login</button>
                                    </div>  
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>

        </main>
        <Footer></Footer>
        </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 