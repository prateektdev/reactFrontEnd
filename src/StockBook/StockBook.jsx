import React from 'react';
import { connect } from 'react-redux';

import { Header } from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { userActions, bookActions } from '../_actions';
import { history } from '../_helpers';
class StockBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            pageNumber: 1,
            order_by: "id",
            order_by_ASC_DESC: "DESC",
            q: "",
            pages: 1,
            searchText: "",
            dataSet: [["adsd", "1", "cvbc", "1", "as", "1", "pappu"],
            ["cxc", "16", "werwe", "34", "sds", "11", "baba"],
            ["wew", "32", "rtyrty", "78", "sad", "3", "pritesh"],
            ["qwewq", "23", "ghfgh", "45", "xcvxc", "23", "asdsd"],
            ["wewqe", "44", "asfsdg", "22", "sads", "4", "acsd"],
            ["sdsd", "56", "cvbcv", "45", "ZXZX", "54", "nan"]],
            archiveCompanies: [],
        },
        this.addBook =this.addBook.bind(this) ;
        this.editbook =this.editbook.bind(this) ;
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.getbooks) {
            if (props.getbooks.books) {
                this.setState({ books: props.getbooks.books });
            }
        }
    }

    handlePageChange(number) {
        if (number <= this.state.pages) {
            if (number < 1) {
            } else
                if (number == 1) {
                    this.setState({ pageNumber: 1 });
                    this.props.dispatch(userActions.getAllCompanies(number, this.state.order_by, this.state.order_by_ASC_DESC, this.state.q));
                } else
                    if (number == this.state.pages) {
                        this.setState({ pageNumber: this.state.pages });
                        this.props.dispatch(userActions.getAllCompanies(this.state.pages, this.state.order_by, this.state.order_by_ASC_DESC, this.state.q));
                    } else
                        if (number > 1) {
                            this.setState({ pageNumber: number });
                            this.props.dispatch(userActions.getAllCompanies(number, this.state.order_by, this.state.order_by_ASC_DESC, this.state.q));
                        }
        }
    }

    handleSort(field) {
        this.setState({ order_by: field });
        this.setState({ order_by_ASC_DESC: this.state.order_by_ASC_DESC == "ASC" ? "DESC" : "ASC" });
        this.props.dispatch(userActions.getAllCompanies(this.state.pageNumber, field, this.state.order_by_ASC_DESC == "ASC" ? "DESC" : "ASC", this.state.q));
    }

    handleSearch(event) {
        const { value } = event.target;
        this.setState({
            q: value
        });
        this.props.dispatch(userActions.getAllCompanies(this.state.pageNumber, this.state.order_by, this.state.order_by_ASC_DESC == "ASC" ? "DESC" : "ASC", value));
    }

    componentDidMount() {
        this.props.dispatch(bookActions.getOutOfStockBooks());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    editbook(id) { 
        this.props.dispatch(bookActions.getBook(id));
    }
    addBook(){
        history.push("/addbook") ;
    }
    outOfStockBooks(){
        history.push("/outofstock") ;
    }
    render() {
        var columns = [
            { title: 'Company Name', prop: 'company_name' },
            { title: 'A.B.N', prop: 'company_number' },
            { title: 'Admin Name', prop: 'company_admin_details' },
            { title: 'Users', prop: 'count_users' },
            { title: 'Directors', prop: 'count_directors' },
            { title: 'Status', prop: 'is_active' },
            { title: 'Action' },
        ];

        var data = [
            // { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' }
            // It also supports arrays
            // [ 'name value', 'city value', 'address value', 'phone value' ]
        ];
        const { companies } = this.props;

        return (
            <div>
                <main className="wrapper">
                    <Header />

                    <div className="wrap_content companies_content">
                        <div className="container">
                            <section className="head_ttl_block">
                                <div className="head_ttl_lft">
                                    <div className="main_title">
                                        <h2>Books</h2>

                                    </div>
                                    {/* <div className="notify_status">
                          <ul>
                              <li><a href="#">Draft <span className="bdg_lbl">5</span></a></li>
                              <li><a href="#">Review  <span className="bdg_lbl">13</span></a></li>
                              <li><a href="#">Approved <span className="bdg_lbl">15</span> </a></li>
                          </ul>
                      </div> */}
                                </div>
                                <div className="head_ttl_rht">
                                    {/* <div className="search_block">
                         <div className="srch_inp_group">
                             <input type="text" name="" className="form-control"  value={this.state.q} onChange={(event)=>this.handleSearch(event)}  placeholder="Search..."/> 
                             <button className="btn-search"><i className="fa fa-search"></i></button> 
                         </div>
                      </div> */}
                                    <div className="add_moreBtn">
                                    <button onClick={this.addBook} className="btn btn-theme btn-add">Add New <i className="fa fa-plus"></i></button>
                                    <button onClick={this.outOfStockBooks} className="btn btn-theme btn-add">Out Of Stock <i className="fa fa-trash"></i></button>
                                    </div>
                                </div>
                            </section>
                            {/* <DataSet data={this.state.dataSet}></DataSet> */}

                            <section className="content_block companies_record">
                                <div className="theme_table wht_box_sdw">
                                    <div className="table-responsive">
                                        <table className="table table_data comp_dataTables" id="comp_dataTables">
                                            <thead>
                                                <tr className="row-name">
                                                    <th className="text-center">Title  </th>
                                                    <th className="text-center">Author </th>
                                                    <th className="text-center">ISBN  </th>
                                                    <th className="text-center">Publisher </th>
                                                    <th className="text-center">Category  </th>
                                                    <th className="text-center">Stock  </th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.books.map((book, index) => {
                                                        return (
                                                            <tr key={book.id} className="row-content">
                                                                <td className="text-center"><span>{book.title}</span></td>
                                                                <td className="text-center"><span>{book.author?book.author.firstname+' '+book.author.lastname:""}</span></td>
                                                                <td className="text-center"><span>{book.isbn}</span></td>
                                                                <td className="text-center"><span>{book.publisher?book.publisher.firstname+' '+book.publisher.lastname:""}</span></td>
                                                                <td className="text-center"><span>{book.category}</span></td>
                                                                <td className="text-center"><span>{book.stock}</span></td>
                                                                <td className="text-center"><span><a onClick={(event) => (this.editbook(book.id))} className="btn-view">View </a></span></td>
                                                            </tr>);
                                                    })
                                                }
                                                {this.state.books.length > 0 ? ("") : (<tr><td colSpan="7">No records found</td></tr>)}
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
    const { authentication, getbooks } = state;
    const { user } = authentication;
    return {
        user,
        getbooks
    };
}

const connectedStockBook = connect(mapStateToProps)(StockBook);
export { connectedStockBook as StockBook };