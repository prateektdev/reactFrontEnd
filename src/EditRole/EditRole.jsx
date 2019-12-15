import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { roleActions } from '../_actions/index.js';
import { history } from '../_helpers';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
class EditRole extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            role: {
                rolename: '',
                roleid:0,
                rolePermissionList: [],
                status: '',
                permission: JSON.parse(localStorage.getItem('permission'))
            },
            active: false,
            permission: JSON.parse(localStorage.getItem('permission'))
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.mapPermissiontoJSONObject = this.mapPermissiontoJSONObject.bind(this);
        this.fillPermissionInRole = this.fillPermissionInRole.bind(this);
    }

    componentWillReceiveProps(props) {
        console.log(props)
        if (props.getRole) {
            if (props.getRole.role) {
                console.log('here', props.getRole.role[0])
            }
        }
    }

    componentDidMount() {
        console.log('props', this.props)
        if (this.props.getRole)
            this.setState({ role: this.props.getRole.role[0] }, () => {
                this.mapPermissiontoJSONObject();
            })
    }

    mapPermissiontoJSONObject() {
        let perm =  JSON.parse(this.state.role.rolePermissionList);
        let rolePermissions = JSON.parse(this.state.role.rolePermissionList);
        let permission = [];
        perm.map((prod, prodIndex) => { 
            let product = {
                productName: prod.productName,
                features: []
            };
            prod.features.map((feat, featIndex) => {
                let feature = {
                    name: feat.name,
                    permission: []
                }
                feat.permission.map((perm, permIndex) => { 
                    let permission = {
                        name: perm,
                        checked: true//rolePermissions[prodIndex].features[featIndex].permission.contains(perm)
                    }
                    feature.permission.push(permission)
                })
                product.features.push(feature);
            })
            permission.push(product);
        })
        this.setState({ permission: permission });
    }

    fillPermissionInRole() {
        let perm = this.state.permission;
        let permission = "[";
        perm.map((prod, prodIndex) => {
            let product = "ProductFeaturesList [productName=" + prod.productName + ",featuresWithPermissionList= ["
            prod.features.map((feat, featIndex) => {
                let feature = "PermissionList [featureName=" + feat.name + ", permission=["
                feat.permission.map((perm, permIndex) => {
                    // console.log(perm.checked,permIndex)
                    if (permIndex < feat.permission.length) {
                        if (perm.checked) {
                            feature += perm.name + ', '
                        }
                    }
                })
                if (feature.endsWith(", "))
                    feature = feature.substring(0, feature.length - 2)
                feature += "]"
                // console.log(feature)
                if (featIndex < prod.features.length) {
                    product += feature + '], '
                }
            })
            if (product.endsWith(", "))
                product = product.substring(0, product.length - 2)
            product += "]],"
            permission += product
        })
        if (permission.endsWith(","))
            permission = permission.substring(0, permission.length - 1)
        const { role } = this.state
        this.setState({
            role: {
                ...role,
                rolePermissionList: permission + ']'
            }
        }, () => {
            this.props.dispatch(roleActions.editRole(this.state.role));
        })
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { role } = this.state;

        this.setState({
            role: {
                ...role,
                [name]: value
            }
        });
    }

    handleStatusChange(event, productIndex, featureIndex, permissionIndex) {
        event.preventDefault();
        let permission = this.state.permission;
        // console.log('permission before : ', permission[productIndex].features[featureIndex].permission[permissionIndex].checked)
        permission[productIndex].features[featureIndex].permission[permissionIndex].checked = !permission[productIndex].features[featureIndex].permission[permissionIndex].checked;
        this.setState({ permission: permission, active: !this.state.active }, () => {
            // console.log('permission after: ', permission[productIndex].features[featureIndex].permission[permissionIndex].checked)
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('role : ', this.state.role)
        const { role } = this.state
        this.fillPermissionInRole();
        // this.setState({
        //     role: {
        //         ...role,
        //         rolePermissionList: "[ProductFeaturesList [productName=Service tiketing2, featuresWithPermissionList=[PermissionList [featureName=Dashboard, permission=[View Ticket, View1 Ticket, View2 Ticket, View3 Ticket, View4 Ticket]], PermissionList [featureName=Dashboard2, permission=[View Ticket, View1 Ticket, View2 Ticket, View3 Ticket, View4 Ticket]], PermissionList [featureName=Dashboard3, permission=[View Ticket, View1 Ticket, View2 Ticket, View3 Ticket, View4 Ticket]]]], ProductFeaturesList [productName=Service tiketing2, featuresWithPermissionList=[PermissionList [featureName=Dashboard, permission=[View Ticket, View1 Ticket, View2 Ticket, View3 Ticket, View4 Ticket]], PermissionList [featureName=Dashboard2, permission=[View Ticket, View1 Ticket, View2 Ticket, View3 Ticket, View4 Ticket]], PermissionList [featureName=Dashboard3, permission=[View Ticket, View1 Ticket, View2 Ticket, View3 Ticket, View4 Ticket]]]]]"
        //     }
        // }, () => {

        // })


    }

    cancel() {
        history.push("/dashboard");
    }

    render() {
        return (
            <div>
                <main className="wrapper">
                    <Header />
                    <div className="wrap_content addCompany_content">
                        <div className="container">
                            <section className="head_ttl_block">
                                <div className="head_ttl_lft">
                                    <div className="main_title">
                                        <h2>Role Details</h2>
                                    </div>
                                </div>
                            </section>

                            <section className="content_block add_cmp_sec">
                                <div className="white_box">
                                    <form className="theme-form" onSubmit={this.handleSubmit}>

                                        <div className="upd_cmp_details">
                                            <div className="upd_cmp_desc">
                                                <div className="row">
                                                    <div className="form-group col-sm-6">
                                                        <label className="lable-cntrl">Role Name </label>
                                                        <input type="text" name="rolename" defaultValue={this.state.role.rolename} onChange={this.handleChange} className="form-control" placeholder="" />
                                                    </div>

                                                </div>


                                                <div className="row">
                                                    <div className="form-group col-sm-6">
                                                        <label className="lable-cntrl">Role Type </label>

                                                        <Accordion allowZeroExpanded={true}>
                                                            {
                                                                this.state.permission.map((permission, productIndex) => {
                                                                    return (<AccordionItem key={productIndex}> <AccordionItemHeading>
                                                                        <AccordionItemButton>
                                                                            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{permission.productName}</b>
                                                                        </AccordionItemButton>
                                                                    </AccordionItemHeading>
                                                                        <AccordionItemPanel>
                                                                            <div>
                                                                                <br />
                                                                                {
                                                                                    permission.features.map((feature, featureIndex) => {
                                                                                        return (
                                                                                            <Accordion allowMultipleExpanded={true} allowZeroExpanded={true} key={
                                                                                                featureIndex
                                                                                            }>
                                                                                                <AccordionItem> <AccordionItemHeading>
                                                                                                    <AccordionItemButton>
                                                                                                        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{feature.name}</strong>
                                                                                                    </AccordionItemButton>
                                                                                                </AccordionItemHeading>
                                                                                                    <AccordionItemPanel>
                                                                                                        <div>
                                                                                                            <br />
                                                                                                            <div className="row">
                                                                                                                {
                                                                                                                    feature.permission.map((perm, permisionIndex) => {
                                                                                                                        return (

                                                                                                                            <div className="form-group col-sm-3" key={permisionIndex}>
                                                                                                                                <label className="lable-cntrl">{perm.name}</label>
                                                                                                                                {perm.checked && <img src="assets/images/checked-checkbox-icon.png" height="30px" onClick={(event) => this.handleStatusChange(event,
                                                                                                                                    productIndex,
                                                                                                                                    featureIndex,
                                                                                                                                    permisionIndex)} width="30px" />}
                                                                                                                                {!perm.checked && <img src="assets/images/unchecked-checkbox-icon-14.png" height="30px" onClick={(event) => this.handleStatusChange(event,
                                                                                                                                    productIndex,
                                                                                                                                    featureIndex,
                                                                                                                                    permisionIndex)} width="30px" />}

                                                                                                                            </div>


                                                                                                                        )
                                                                                                                    })
                                                                                                                }
                                                                                                            </div></div>
                                                                                                    </AccordionItemPanel>
                                                                                                </AccordionItem>
                                                                                            </Accordion>)
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </AccordionItemPanel>
                                                                    </AccordionItem>)
                                                                })
                                                            }
                                                        </Accordion>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-submit">
                                            <button className="btn-theme btn btn-blue">Submit</button>
                                            <button onClick={this.cancel} className="btn-theme btn btn-cancel">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { authentication, getRole, editRole } = state;
    const { user } = authentication;
    return {
        user,
        getRole,
        editRole
    };
}

const connectedEditRole = connect(mapStateToProps)(EditRole);
export { connectedEditRole as EditRole };