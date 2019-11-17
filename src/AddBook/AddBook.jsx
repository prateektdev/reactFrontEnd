import React from 'react';
import { connect } from 'react-redux';

import config from 'config';
import { Header } from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { userActions, bookActions } from '../_actions/index.js';
import { history } from '../_helpers';

class AddBook extends React.PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            book: { 
                title:"",
                isbn:"",
                category:"",
                stock:0
            },
            errorCompany: {
                company_name: "",
                company_admin: "",
                company_number: "",
                address: "",
                admin_email: "",
                admin_id: ""
            },
            users: []

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { book } = this.state;

        this.setState({
            book: {
                ...book,
                [name]: value
            }
        });

    }

    componentWillReceiveProps(props) { 
        if(props.getusers){
            if(props.getusers.users){
                this.setState({users:props.getusers.users}) ;
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAllUsers()) ;
    }
 
    handleSubmit(e) {
        e.preventDefault();
        let publisher = this.state.users.find((obj)=>obj.id==this.state.book.publisher) ;
        let author = this.state.users.find((obj)=>obj.id==this.state.book.author) ;
        let book = {...this.state.book} ;
        book.author=author ;
        book.publisher=publisher ;
        this.props.dispatch(bookActions.addBook(book)); 

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
                                        <h2>Add Book</h2>
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
                                                        <label className="lable-cntrl">Book Title &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-danger">{this.state.errorCompany.company_name.length >= 1 ? this.state.errorCompany.company_name : ""}</span></label>
                                                        <input type="text" name="title" defaultValue={this.state.book.title} onChange={this.handleChange} className="form-control" placeholder="" />
                                                    </div>
                                                    <div className="form-group col-sm-6">
                                                        <label className="lable-cntrl">Book Author</label>
                                                        <select   value={this.state.book.author} name="author" onChange={this.handleChange} className="form-control">
                                                        <option></option>
                                                        {
                                                            this.state.users.map((user, index) => {
                                                                return (<option key={index} value={user.id}>{user.firstname + " " + user.lastname}</option>);
                                                            })
                                                        }
                                                        </select>
                                                    </div>
                                                </div><div className="row"><div className="form-group col-sm-6">
                                                    <label className="lable-cntrl">Book Publisher</label>
                                                    <select   value={this.state.book.publisher} name="publisher" onChange={this.handleChange} className="form-control">
                                                    <option></option>
                                                        {
                                                            this.state.users.map((user, index) => {
                                                                return (<option key={index} value={user.id}>{user.firstname + " " + user.lastname}</option>);
                                                            })
                                                        }
                                                        
                                                    </select>
                                                </div> <div className="form-group col-sm-6">
                                                        <label className="lable-cntrl">Book Category</label>
                                                        <select   value={this.state.book.category} name="category" onChange={this.handleChange} className="form-control">
                                                           
                                                            <option value="0">Category1</option>
                                                            <option value="1">Category2</option>
                                                            <option selected value="2">Category3</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="form-group col-sm-6">
                                                        <label className="lable-cntrl">ISBN <span className="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.errorCompany.company_number.length >= 1 ? this.state.errorCompany.company_number : ""}</span></label>
                                                        <input type="text" name="isbn" value={this.state.book.isbn} onChange={this.handleChange} className="form-control" placeholder="" />
                                                    </div>
                                                    <div className="form-group col-sm-6">
                                                        <label className="lable-cntrl">Stock</label>
                                                        <input type="text" name="stock" value={this.state.book.stock} onChange={this.handleChange} className="form-control" placeholder="" />
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
    const { authentication, getusers, updateattachment, editcompany } = state;
    const { user } = authentication;
    return {
        user,
        getusers,
        editcompany,
        updateattachment
    };
}

const connectedAddBook = connect(mapStateToProps)(AddBook);
export { connectedAddBook as AddBook };