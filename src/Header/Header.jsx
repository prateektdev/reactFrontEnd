import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import config from 'config';
import { Modal } from 'react-bootstrap';
import { history } from '../_helpers';
import { DropdownButton, MenuItem, CustomMenu, CustomToggle, Dropdown } from 'react-bootstrap';


class Header extends React.Component {

    constructor(props) {
        super(props);
       
    }
    componentWillReceiveProps(props) {

    }


    componentDidMount() {
    }


    render() {
        return (

            <header className="header-sec">
                <nav className="navbar navbar_theme">
                    <div className="header_top">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#header_menu" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar top-bar"></span>
                                    <span className="icon-bar middle-bar"></span>
                                    <span className="icon-bar bottom-bar"></span>
                                </button>
                                <a className="navbar-brand brand_logo" href="/">
                                </a> 
                            </div> {/*/.  navbar-header */}

                            <div className="nav_user_prof">
                                {/* {this.state.user.user_type == 1 ? "" :
                                    (<ul className="notifications" >
                                        <li className="gift_notify">
                                            <a href="#">

                                                <div className="notify_count">
                                                    <i className="fa fa-gift" aria-hidden="true"></i>
                                                    <span className="count">1</span>
                                                </div> 
                                            </a>
                                        </li>
                                        <li className="bell_notify">
                                            <a href="#">
                                                <div className="notify_count">
                                                    <i className="fa fa-bell" aria-hidden="true"></i>
                                                    <span className="count">1</span>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>)} */}

                                <ul className="nav profile_setting">
                                    <li className="profile_block dropdown">

                                        <DropdownButton id="none" title={<a   >
                                            Settings
                                        </a>}>
                                            <MenuItem onClick={this.logout} href="/login">Logout</MenuItem>
                                        </DropdownButton>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="nav_menu_block">
                        <div className="container">
                            {/* .navbar-collapse */}
                            <div className="collapse navbar-collapse header_menu" id="header_menu">
                                <ul className="nav navbar-nav nav_main_menu">
                                    <li className="active"><a href="/"><i className="fa fa-tachometer" aria-hidden="true"></i> Roles</a></li>
                                </ul>
                                
                            </div>{/* /.navbar-collapse */}
                        </div>
                    </div>{/*/. nav_menu_block */}
                </nav>
            </header>
        );
    }
}

// export default Header;


function mapStateToProps(state) {
    const { authentication, getfeatureslistgift } = state;
    const { user } = authentication;
    return {
        user,
        getfeatureslistgift

    };
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };