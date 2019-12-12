import React from 'react';
import { connect } from 'react-redux';

import { Header } from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { roleActions } from '../_actions';
import { history } from '../_helpers';
class Roles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roles: []
        },

        this.editRole = this.editRole.bind(this);
        this.addRole = this.addRole.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.getRoles) {
            if (props.getRoles.roles) {
                this.setState({ roles: props.getRoles.roles });
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(roleActions.getAllRoles());
    }

    editRole(id) {
        this.props.dispatch(bookActions.getBook(id));
    }
    addRole() {
        history.push("/addrole");
    }

    render() {

        return (
            <div>
                <main className="wrapper">
                    <Header />

                    <div className="wrap_content companies_content">
                        <div className="container">
                            <section className="head_ttl_block">
                                <div className="head_ttl_lft">
                                    <div className="main_title">
                                        {/* <h2>Roles</h2> */}

                                    </div>
                                </div>
                                <div className="head_ttl_rht">
                                    <div className="add_moreBtn">
                                        <button onClick={this.addRole} className="btn btn-theme btn-add">Add New <i className="fa fa-plus"></i></button>
                                    </div>
                                </div>
                            </section>

                            <section className="content_block companies_record">
                                <div className="theme_table wht_box_sdw">
                                    <div className="table-responsive">
                                        <table className="table table_data comp_dataTables" id="comp_dataTables">
                                            <thead>
                                                <tr className="row-name">
                                                    <th className="text-center">Name  </th>
                                                    <th className="text-center">Type </th>
                                                    <th className="text-center">Status  </th>
                                                    <th className="text-center">createdby </th>
                                                    <th className="text-center">createdat  </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.roles.map((role, index) => {
                                                        return (
                                                            <tr key={role.id} className="row-content">
                                                                <td className="text-center"><span>{role.rolename}</span></td>
                                                                <td className="text-center"><span>{role.roletype}</span></td>
                                                                <td className="text-center"><span>{role.status}</span></td>
                                                                <td className="text-center"><span>{role.createdby}</span></td>
                                                                <td className="text-center"><span>{role.createdat}</span></td>
                                                                <td className="text-center"><span><a onClick={(event) => (this.editRole(role.roleid))} className="btn-view">View </a></span></td>
                                                            </tr>);
                                                    })
                                                }
                                                {this.state.roles.length > 0 ? ("") : (<tr><td colSpan="7">No records found</td></tr>)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                </main>
                <Footer></Footer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, getRoles } = state;
    const { user } = authentication;
    return {
        user,
        getRoles
    };
}

const connectedRoles = connect(mapStateToProps)(Roles);
export { connectedRoles as Roles };