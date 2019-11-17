import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastLame && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div>
            <main className="wrapper">
            <section className="sign-screen">
                    <div className="cust_container">
                  <div className="sign_inr_cont">
                      <div className="wht_box_card">
                          <div className="form-boxs">
                              <div className="outer-logo">
                                   <a href="#"><img src="assets/images/logo-2x.png" alt="LOGO"/> <span>Digital Business Card</span></a>
                              </div>
                              <div className="sign_form_desc">
                                  <h3>Sign In</h3>
                                 
                                  <form className="theme-form" data-toggle="validator" role="form">
  
                                      {/* <div className="error-alert error-head">Error: Those credentials don’t look right. Please try again.</div>  */}
                                      <div className="alert alert-success">
                                          <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                                          <strong>Successfully submitted!</strong> The form is valid.
                                      </div>
  
                                      <div className="form-group">
                                          <label className="label-ctrl">Email</label>
                                          <div className="theme_input_group">
                                            <input type="email" className="form-control" id="inputEmail" placeholder="" required/>
                                            <div className="help-block error-alert with-errors"></div>
                                          </div>
                                      </div> 
  
                                      <div className="form-group">
                                          <label className="label-ctrl">Password</label>
                                          <div className="theme_input_group">
                                              <input type="password" className="form-control" id="inputPassword" placeholder="" required/>
                                              <div className="help-block error-alert with-errors"></div>
                                          </div>
                                      </div> 
  
                                      <div className="new_usr_acct">
                                          <a className="create_acct" href="/signup"> Create Account</a>
                                          <a className="forgot_pwd" href="#" className="forget-pwd">Forgot Password ?</a>
                                      </div>
  
                                      <div className="form-submit">
                                         <button type="submit" className="btn btn-theme"> <i className="fas fa-sign-in-alt"></i> Sign In</button>
                                      </div> 
                                  </form> 
                              </div>
                          </div>
                      </div>
                      <div className="img_box_card"></div>
                  </div>
                 </div>
            </section>
      </main>
      <Footer></Footer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedSignUpPage = connect(mapStateToProps)(SignUpPage);
export { connectedSignUpPage as SignUpPage };