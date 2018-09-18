import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../common/header';
import Sidebar from '../../common/sidebar';
import axios from 'axios';
import ENDPOINTS from '../../common/endpoints';
import IMAGE from '../../common/image';
import _ from 'lodash'

function AccountList(props) {
    // console.log(props.account.checked);
    return (
        <div className="account_list_row">
            {props.teamAccounts != true && <div className="account_checkbox">
                <input
                    type="checkbox"
                    value="abc"
                    id={"acc_" + props.account.id}
                    checked={props.account.checked === undefined ? false : props.account.checked}
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
                            {props.account.star_id_list.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
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

class CampaignAccounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            page_number: 1,
            account: "",
            starTypes: [],
            activeTab: ""
        }
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({
            accounts: JSON.parse(localStorage.getItem("visitData")).accounts,
            starTypes: JSON.parse(localStorage.getItem("visitData")).starTypes,
            activeTab: JSON.parse(localStorage.getItem("visitData")).starTypes[0].type
        })
        setTimeout(() => {
            this.filterAccount(JSON.parse(localStorage.getItem("visitData")).starTypes[0].id, JSON.parse(localStorage.getItem("visitData")).accounts);
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadMoreAccount() {
        let toBePageNumber = this.state.page_number + 1;
        if(this.state.account_type === "My Accounts") {
            this.getMyTeamAccountList(toBePageNumber);
        }
        else {
            this.getMyTeamAccountList(toBePageNumber);
        }
        this.setState({
            page_number: toBePageNumber
        })
    }

    redirectToVisit() {
        let starTypeId = this.state.starTypes.filter((el) => {
            return el.type === this.state.activeTab
        })
        let accounts = this.state.accounts.filter((el) => {
            return el.checked === true
        })
        this.props.history.push({
            pathname: '/update-visits',
            state: {
                starId: starTypeId,
                account: accounts
            }
        })
    }

    changeTab(val) {
        this.setState({
            activeTab: val.type
        })
        this.filterAccount(val.id, JSON.parse(localStorage.getItem("visitData")).accounts);
    }

    filterAccount(val, account_list) {
        let accounts = account_list.filter((elem) => {
            return _.includes(elem.star_id_list, val);
        })
        .map((el) => {
            var o = Object.assign({}, el);
            o.checked = false;
            return o;
        })
        console.log(accounts);
        this.setState({
            accounts: accounts
        })
    }

    updateVisitData(e, account) {
        // console.log(account.id);
        // console.log(this.state.accounts);
        if(this._isMounted) {
            this.setState({
                account_main: account
            })
        }
        let accountList = this.state.accounts.map(function(el) {
            var o = Object.assign({}, el);
            // console.log(el.id + "===" + account.id);
            if(el.id === account.id) {
                o.checked = true;
            }
            return o;
        })
        if(this._isMounted) {
            this.setState({
                accounts: accountList
            })
        }
    }

    render() {
        return (
            <div>

                <Header />

                <div className="main_body">

                    <Sidebar />

                    <div className="content_area">

                        <div className="row">

                            <div className="col-md-12">
                                <div className="page_title">
                                    <svg version="1.1" id="Capa_1" x="0px" y="0px"
                                    	 viewBox="0 0 213.275 213.275" style={{enableBackground: "new 0 0 213.275 213.275"}}>
                                        <g>
                                        	<path d="M183.743,0H29.532c-4.142,0-7.5,3.358-7.5,7.5v198.275c0,4.142,3.358,7.5,7.5,7.5h103.555c1.989,0,3.896-0.79,5.304-2.197
                                        		l50.656-50.658c1.406-1.407,2.196-3.314,2.196-5.303V7.5C191.243,3.358,187.886,0,183.743,0z M37.032,15h139.211v132.615h-43.154
                                        		c-4.143,0-7.5,3.358-7.5,7.5v8.275H73.562c-4.143,0-7.5,3.358-7.5,7.5c0,4.142,3.357,7.5,7.5,7.5h52.027v19.885H37.032V15z
                                        		 M140.589,162.615h25.051l-25.051,25.051V162.615z"/>
                                        	<path d="M106.544,84.643c16.497,0,29.918-13.424,29.918-29.925c0-16.501-13.421-29.926-29.918-29.926
                                        		c-16.498,0-29.921,13.425-29.921,29.926C76.623,71.219,90.046,84.643,106.544,84.643z M106.544,39.792
                                        		c8.226,0,14.918,6.696,14.918,14.926c0,8.229-6.692,14.925-14.918,14.925c-8.228,0-14.921-6.695-14.921-14.925
                                        		C91.623,46.488,98.316,39.792,106.544,39.792z"/>
                                        	<path d="M73.562,138.528c4.143,0,7.5-3.358,7.5-7.5v-12.447c0-7.828,6.371-14.196,14.201-14.196h22.744
                                        		c7.834,0,14.207,6.368,14.207,14.196v12.447c0,4.142,3.357,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5v-12.447
                                        		c0-16.099-13.103-29.196-29.207-29.196H95.263c-16.102,0-29.201,13.097-29.201,29.196v12.447
                                        		C66.062,135.17,69.419,138.528,73.562,138.528z"/>
                                        </g>
                                    </svg>
                                    Campaign Accounts
                                </div> {/* page_title */}
                                <ol className="breadcrumb">
                                    {this.state.starTypes.map((item, index) => (
                                        <li key={index} className={"" + (this.state.activeTab === item.type ? "active" : "")}><a href="javascript:void(0);" onClick={() => this.changeTab(item)}>{item.type}</a></li>
                                    ))}
                                </ol> {/* breadcrumb */}
                                <div>
                                    <div className="account_filter text-right">
                                        <button type="button" onClick={this.redirectToVisit.bind(this)} className="site_btn">Update Visits</button>
                                    </div> {/* account_filter */}
                                    <div className="account_list_wrapper position_relative">
                                        <div className={"loader_wrap" + (this.state.loading === true ? "" : " hidden")}><img src={IMAGE.loader} alt="" /></div>
                                        {this.state.accounts.map((item, index) => (
                                            <AccountList updateVisitData={(e, account) => this.updateVisitData(e, account)} key={index} account={item} />
                                        ))}
                                        {this.state.accounts.length <= 0 && <div className="text-center">No accounts found</div>}
                                        {this.state.showLoadMore === true && <div className="text-center load_more_wrapper">
                                            <button type="button" className="load_more_btn" onClick={this.loadMoreAccount.bind(this)}>Load More</button>
                                        </div>}
                                    </div> {/* account_list_wrapper */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(CampaignAccounts);
