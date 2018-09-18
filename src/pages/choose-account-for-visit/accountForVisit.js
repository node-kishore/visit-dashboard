import React, { Component } from 'react';
import Header from '../../common/header';
import Sidebar from '../../common/sidebar';
import IMAGE from '../../common/image';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import ENDPOINTS from '../../common/endpoints';

function AccountList(props) {
    return (
        <div className="account_list_row">
            {props.teamAccounts != true && <div className="account_checkbox">
                <input
                    checked={props.account.checked === undefined ? false : props.account.checked}
                    type="checkbox"
                    id={"acc_" + props.account.id}
                    onChange={(e) => props.updateVisitData(e, props.account)} />
                <label htmlFor={"acc_" + props.account.id}></label>
            </div>}
            <div className="account_row_box">
                <div className="account_row_box_header">
                    <ul>
                        <li>
                            <h3>{props.account.name}</h3>
                            <p>{props.account.organization_name == "" ? "-" : props.account.organization_name}</p>
                        </li>
                        <li>
                            <p>Category</p>
                            <p>B</p>
                        </li>
                        <li>
                            <p>Type</p>
                            <p>{props.account.ifa_category === "" ? "-" : props.account.ifa_category}</p>
                        </li>
                        <li>
                            <p>ARN Code</p>
                            <p>{props.account.arn_code == "" ? "-" : props.account.arn_code}</p>
                        </li>
                    </ul>
                </div>
                <div className="account_row_box_body">
                    <p>Account ID - <span>{props.account.account_id == "" ? "NA" : props.account.account_id}</span></p>
                    <p>External ID - <span>{props.account.external_id == "" ? "NA" : props.account.external_id}</span></p>
                    <p>Added - <span>{props.account.added == "" ? "NA" : props.account.added}</span></p>
                    <p>Action - <span>{props.account.action == "" ? "NA" : props.account.action}</span></p>
                    <p>Created User - <span>{props.account.created_user == "" ? "NA" : props.account.created_user}</span></p>
                    <p>Assigned User - <span>{props.account.assigned_user == "" ? "NA" : props.account.assigned_user}</span></p>
                    <p>Star Type - <span>{props.account.star_type == "" ? "NA" : props.account.star_type}</span></p>
                    <p>Alternate Contact Number - <span>{props.account.alternate_contact_number == "" ? "NA" : props.account.alternate_contact_number}</span></p>
                    <p>Distributor Category - <span>{props.account.distributor_category == "" ? "NA" : props.account.distributor_category}</span></p>
                    <p>RM Code - <span>{props.account.rm_code == "" ? "NA" : props.account.rm_code}</span></p>
                    <p>RM Name - <span>{props.account.rm_name == "" ? "NA" : props.account.rm_name}</span></p>
                    <p>Frequency - <span>{props.account.frequency == "" ? "NA" : props.account.frequency}</span></p>
                    <p>RM Type - <span>{props.account.rm_type == "" ? "NA" : props.account.rm_type}</span></p>
                </div>
            </div>
        </div>
    )
}

class ChooseAccount extends Component {

    constructor(props) {
        super();
        this.state = {
            accounts: [],
            allAccounts: [],
            accountSearch_val: "",
            showUpdateBtn: false
        }
        // redirectToVisit = redirectToVisit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if(this._isMounted) {
            this.setState({
                allAccounts: JSON.parse(localStorage.getItem("visitData")).accounts
            })
        }
        console.log(this._isMounted);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    doSearch(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        let filterAccount = this.state.allAccounts.filter(elem => {
            return elem.field_value_string.includes(e.target.value)
        })
        if(e.target.value === "") {
            this.setState({
                accounts: []
            })
        }
        else {
            this.setState({
                accounts: filterAccount
            })
        }
    }

    redirectTo() {
        let checkedAccounts = this.state.allAccounts.filter(function(el) {
            return el.checked && el.checked === true
        })
        this.props.history.push({
            pathname: '/update-visits',
            state: {
                account: checkedAccounts
            }
        })
    }

    updateVisitData(e, account) {
        let accountList = this.state.accounts.map(function(el) {
            var o = Object.assign({}, el);
            // console.log(el.id + "===" + account.id);
            if(el.id === account.id) {
                o.checked = e.target.checked;
            }
            return o;
        })
        let allAaccountList = this.state.allAccounts.map(function(el) {
            var o = Object.assign({}, el);
            // console.log(el.id + "===" + account.id);
            if(el.id === account.id) {
                o.checked = e.target.checked;
            }
            return o;
        })
        let countChecked = allAaccountList.filter((el) => {
            return el.checked && el.checked === true
        })
        if(this._isMounted) {
            this.setState({
                accounts: accountList,
                allAccounts: allAaccountList
            })
        }
    }

    render() {
        return (
            <div>

                <Header />

                <div className="main_body">

                    <Sidebar />

                    <div className="content_area update_visit_content">
                        <div>
                            <div className="col-md-12">
                                <div className="visit_account_search">
                                    <input type="text" placeholder="Search..." name="accountSearch_val" onChange={this.doSearch.bind(this)} />
                                </div>
                                {/*<div className="choosed_wrap">
                                    <div className="choosed_box">
                                        <span>IDBI Bank Limited</span>
                                        <button>
                                            <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground:"new 0 0 512 512"}} width="512px" height="512px">
                                                <g>
                                            	       <g>
                                            		         <path d="M493.297,159.693c-12.477-30.878-31.231-59.828-56.199-84.792c-24.965-24.969-53.917-43.723-84.795-56.2    C321.421,6.22,288.611,0,255.816,0c-32.747,0-65.495,6.249-96.311,18.744c-30.813,12.491-59.693,31.244-84.603,56.158    c-24.915,24.911-43.668,53.792-56.158,84.607C6.249,190.324,0,223.072,0,255.822c0,32.794,6.222,65.602,18.701,96.485    c12.477,30.877,31.231,59.828,56.2,84.792c24.964,24.967,53.914,43.722,84.792,56.199c30.882,12.48,63.69,18.701,96.484,18.703    c32.748,0,65.497-6.249,96.315-18.743c30.814-12.49,59.695-31.242,84.607-56.158c24.915-24.912,43.668-53.793,56.158-84.608    c12.494-30.817,18.743-63.565,18.744-96.315C512,223.383,505.778,190.575,493.297,159.693z M461.611,339.66    c-10.821,26.683-27.018,51.648-48.659,73.292c-21.643,21.64-46.608,37.837-73.291,48.659    c-26.679,10.818-55.078,16.241-83.484,16.241c-28.477,0-56.947-5.406-83.688-16.214c-26.744-10.813-51.76-27.008-73.441-48.685    C77.37,391.27,61.174,366.255,50.363,339.51c-10.808-26.741-16.214-55.212-16.213-83.689c-0.001-28.405,5.423-56.802,16.24-83.482    c10.821-26.683,27.018-51.648,48.659-73.291c21.643-21.64,46.607-37.837,73.289-48.659c26.678-10.818,55.075-16.242,83.48-16.242    c28.478,0,56.95,5.405,83.691,16.213c26.745,10.811,51.762,27.007,73.445,48.686c21.678,21.682,37.873,46.697,48.685,73.441    c10.808,26.741,16.214,55.211,16.214,83.688C477.852,284.582,472.429,312.98,461.611,339.66z" fill="#ddd"/>
                                            	        </g>
                                                </g>
                                                <g>
                                            	        <g>
                                            		         <path d="M279.627,256.001l82.693-82.693c6.525-6.525,6.525-17.102,0-23.627c-6.524-6.524-17.102-6.524-23.627,0L256,232.375    l-82.693-82.693c-6.525-6.524-17.102-6.524-23.627,0c-6.524,6.524-6.524,17.102,0,23.627l82.693,82.693l-82.693,82.693    c-6.524,6.523-6.524,17.102,0,23.627c6.525,6.524,17.102,6.524,23.627,0L256,279.628l82.693,82.693    c6.525,6.524,17.102,6.524,23.627,0c6.525-6.524,6.525-17.102,0-23.627L279.627,256.001z" fill="#333333"/>
                                            	        </g>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </div>*/}
                                {this.state.accounts.length <= 0 && this.state.accountSearch_val === "" && <div className="search_account_msg">
                                    Search accounts whose visits needs to be updated with either account name, phone number, email address etc...
                                </div>}
                                {this.state.accounts.length <= 0 && this.state.accountSearch_val != "" && <div className="text-center">
                                    No accounts found
                                </div>}
                                {this.state.accounts.length >= 0 && <div className="choose_account_wrap">
                                    {this.state.accounts.map((item, index) => (
                                        <AccountList updateVisitData={(e, account) => this.updateVisitData(e, account)} account={item} onRedirect={this.redirectTo.bind(this)} key={index} />
                                    ))}
                                </div>}
                                {this.state.allAccounts.filter(el => {
                                    return el.checked && el.checked === true
                                }).length > 0 && <div className="text-center">
                                    <button className="site_btn" onClick={this.redirectTo.bind(this)}>Update {this.state.allAccounts.filter(el => {
                                        return el.checked && el.checked === true
                                    }).length} Visit{this.state.allAccounts.filter(el => {
                                        return el.checked && el.checked === true
                                    }).length > 1 ? "s" : ""}</button>
                                </div>}
                            </div>
                        </div>
                    </div> {/* content_area */}

                </div>
            </div>
        );
    }
}

export default ChooseAccount;
