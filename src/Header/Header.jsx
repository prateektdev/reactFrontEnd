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
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) != undefined ? JSON.parse(localStorage.getItem("user")).user : {},
            isAdmin: JSON.parse(localStorage.getItem("user")) != undefined ? JSON.parse(localStorage.getItem("user")).user.user_type == 1 : false,
            isDeedProvider: JSON.parse(localStorage.getItem("user")) != undefined ? JSON.parse(localStorage.getItem("user")).user.user_type == 2 : false,
            isStakeHolder: JSON.parse(localStorage.getItem("user")) != undefined ? JSON.parse(localStorage.getItem("user")).user.user_type == 4 : false,
            featureListsgift: [],
        }
    }
    goToProfile() {
        history.push("/editCompany")
    }

    logout() {
        localStorage.setItem("user", null);
    }

    goToTeamMembers() {
        history.push("/TeamMembers");
    }

    goTpProfileUpdate() {
        history.push("/profileUpdate");
    }
    cancel() {
        history.push("/termsandclauses");
    }

    featurelist() {
        history.push("/featureslist");
    }

    componentWillReceiveProps(props) { 

    }


    componentDidMount() { 
    } 


    render() {
        if (this.state.featureListsgift.length > 0) {
            console.log("0000000000000", this.state.featureListsgift[0].title);
        }
        let location = window.location.pathname;
        const userClass = location.match(/^\/user/) || location.match(/^\/adduser/) || location.match(/^\/viewuser/) ? "active" : "";
        const dashboardClass = location.match(/^\/dashboard/) || location.match(/^\/acknowledge/) || location.match(/^\/viewdeed/)
            || location.match(/^\/editdeed/) || location.match(/^\/adddeed/) || location.match(/^\/dashboards/) ? "active" : "";
        const deedUpdateClass = location.match(/^\/deedupdate/) ? "active" : "";
        const companiesClass = location.match(/^\/companies/) || location.match(/^\/addcompany/) || location.match(/^\/directors/)
            || location.match(/^\/adddirector/) || location.match(/^\/editcompany/)
            || location.match(/^\/editcompany/) || location.match(/^\/company/) ? "active" : "";
        const termsandclauseClass = location.match(/^\/termsandclauses/) || location.match(/^\/viewclause/)
            || location.match(/^\/editclause/) || location.match(/^\/editterm/) || location.match(/^\/viewterm/)
            || location.match(/^\/addclause/) || location.match(/^\/addterm/) ? "active" : "";
        const settingClass = location.match(/^\/settings/) || location.match(/^\/addminutetemplate/) || location.match(/^\/editminutetemplate/) || location.match(/^\/viewminutetemplate/) ? "active" : "";
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
                                <a className="navbar-brand brand_logo" href="/dashboard"> 
                                </a>
                                <a className="navbar-brand brand_logo" href="/outofstock"> 
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
                                             Welcome
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
                                    <li className={dashboardClass}><a href="/dashboard"><i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard</a></li>
                                    {/* {this.state.isStakeHolder ? ("") : (<li className={companiesClass} ><a href="/companies"><i className="fa fa-building-o" aria-hidden="true"></i> Companies</a></li>)}
                                    {this.state.isStakeHolder ? ("") : (<li className={userClass} ><a href="/users"><i className="fa fa-user-circle-o" aria-hidden="true"></i> Users</a></li>)}
                                    {this.state.isStakeHolder ? ("") : (<li className={termsandclauseClass} ><a href="/termsandclauses"><i className="fa fa-clipboard" aria-hidden="true"></i> Clauses & Terms </a></li>)}
                                    <li className={deedUpdateClass} ><a href="/deedupdate"><i className="fa fa-bolt" aria-hidden="true"></i> Deed Update </a> </li>
                                    <li className={settingClass}><a href="/settings"><i className="fa fa-cog" aria-hidden="true"></i> Settings</a></li> */}
                                    {/* <li><a onClick={this.logout} href="/login"><i className="fa fa-cog" aria-hidden="true"></i> Logout</a></li> */}
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