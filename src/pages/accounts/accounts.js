import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../common/header';
import Sidebar from '../../common/sidebar';
import Filter from '../../common/filter/common_filter';
import axios from 'axios';
import ENDPOINTS from '../../common/endpoints';
import IMAGE from '../../common/image';

function AccountList(props) {
    return (
        <div className="account_list_row">
            {props.teamAccounts != true && <div className="account_checkbox">
                <input
                    type="radio"
                    name="rd1"
                    id={"acc_" + props.account.account_id}
                    onChange={(e) => props.updateVisitData(e, props.account)} />
                <label htmlFor={"acc_" + props.account.account_id}></label>
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

class Accounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            page_number: 1,
            loading: false,
            showLoadMore: false,
            accountIdList: [],
            star_type_id: [],
            account_type: "My Accounts",
            account: "",
            userSelectedForFilter: []
        }
        this._isMounted = false;
    }

    getAccount(page_number) {
        this.setState({
            loading: true
        })
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.get(ENDPOINTS.get_account + "?page_no=" + page_number + "&pagination_size=20", axiosConfig)
            .then(res => {
                console.log(res);
				if(res.data.status && res.data.status == 400) {
                    this.props.history.push('/');
                }
                else {
	                this.setState({
						loading: false,
	                    accounts: this.state.accounts.concat(res.data.accounts)
	                })
                    if(res.data.accounts.length >= 20) {
                        this.setState({
                            showLoadMore: true
                        })
                    }
                    else {
                        this.setState({
                            showLoadMore: false
                        })
                    }
				}
            })
    }

    componentDidMount() {
        this.getAccount(this.state.page_number);
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadMoreAccount() {
        let toBePageNumber = this.state.page_number + 1;
        if(this.state.account_type === "My Accounts") {
            this.getMyTeamAccountList(toBePageNumber, []);
        }
        else {
            this.getMyTeamAccountList(toBePageNumber, this.state.userSelectedForFilter);
        }
        this.setState({
            page_number: toBePageNumber
        })
    }

    redirectToVisit() {
        this.props.history.push({
            pathname: '/update-visits',
            state: {
                account: this.state.account_main
            }
        })
    }

    changeTab(val) {
        this.setState({
            account_type: val,
            page_number: 1,
            userSelectedForFilter: []
        })
        if(val === "My Accounts") {
            this.setState({
                accounts: []
            })
            this.getAccount(1);
        }
        else {
            this.setState({
                accounts: []
            })
            this.getMyTeamAccountList(1, []);
        }
    }

    getMyTeamAccountList(page_number, users) {
        this.setState({
            loading: true
        })
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.post(ENDPOINTS.my_team_account + "?page_no=" + page_number + "&pagination_size=20", {"user_ids": users},axiosConfig)
            .then(res => {
                console.log(res);
				if(res.data.status && res.data.status == 400) {
                    this.props.history.push('/');
                }
                else {
	                this.setState({
						loading: false,
	                    accounts: this.state.accounts.concat(res.data.accounts)
	                })
                    if(res.data.accounts.length >= 20) {
                        this.setState({
                            showLoadMore: true
                        })
                    }
                    else {
                        this.setState({
                            showLoadMore: false
                        })
                    }
				}
            })
    }

    filterAccountTouchBase(e) {
        // console.log(e);
        let users = e.selectedUsers.map((elem) => {
			return elem.id
		})
		this.getMyTeamAccountList(1, users);
		this.setState({
            existUser: e.allUsers,
            userSelectedForFilter: users
        })
    }

    updateVisitData(e, account) {
        if(this._isMounted === true) {
            this.setState({
                account_main: account
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
                                    <svg version="1.1" id="Layer_1" x="0px" y="0px"
                                    	 viewBox="0 0 511.999 511.999" style={{enableBackground: "new 0 0 511.999 511.999"}}>
                                    	<g>
                                    		<g>
                                    			<path d="M456.347,66.782c-78.946,0-133.478-25.577-191.087-63.978c-5.609-3.739-12.914-3.739-18.522,0
                                    				c-57.597,38.401-112.14,63.978-191.086,63.978c-9.217,0-16.696,7.479-16.696,16.696v175.327
                                    				c0,125.881,90.131,232.272,214.293,252.967c0.913,0.152,1.836,0.228,2.75,0.228c0.914,0,1.837-0.076,2.75-0.228
                                    				c124.162-20.696,214.293-127.087,214.293-252.967V83.477C473.043,74.26,465.565,66.782,456.347,66.782z M256,400.695
                                    				c-82.858,0-150.261-67.403-150.261-150.261S173.141,100.173,256,100.173S406.26,167.576,406.26,250.434
                                    				S338.858,400.695,256,400.695z"/>
                                    		</g>
                                    	</g>
                                    	<g>
                                    		<g>
                                    			<path d="M256,133.564c-64.445,0-116.87,52.424-116.87,116.87c0,26.769,9.141,51.387,24.334,71.111
                                    				c16.63-13.115,35.611-22.511,55.911-27.656c-14.919-11.176-24.594-28.991-24.594-49.021c0-33.75,27.468-61.217,61.217-61.217
                                    				c33.75,0,61.217,27.468,61.217,61.217c0,20.027-9.672,37.841-24.589,49.017c20.304,5.14,39.29,14.526,55.929,27.629
                                    				c15.181-19.721,24.312-44.327,24.312-71.081C372.869,185.989,320.445,133.564,256,133.564z"/>
                                    		</g>
                                    	</g>
                                    </svg>
                                    Accounts
                                </div> {/* page_title */}
                                <div className="account_tab">
                                    <ol className="breadcrumb">
                                        <li className={"" + (this.state.account_type === "My Accounts" ? "active" : "")}><a href="javascript:void(0);" onClick={() => this.changeTab("My Accounts")}>My Accounts</a></li>
                                        <li className={"" + (this.state.account_type === "My Team Accounts" ? "active" : "")}><a href="javascript:void(0);" onClick={() => this.changeTab("My Team Accounts")}>My Team Accounts</a></li>
                                    </ol> {/* breadcrumb */}
                                    {this.state.account_type === "My Team Accounts" && <Filter
                                        existUser={this.state.existUser}
                                        onfilterApply={this.filterAccountTouchBase.bind(this)}
                                        filterByUser="true"
                                        filterByDate="false"
                                        dateFormat="without_time"
                                        onlyCustomDate={true}
                                        filterBtnLabel="Custom"
                                        filterId="account_filter"
                                        dateRange="10 Days" />}
                                </div>
                                {this.state.account_type === "My Accounts" && <div>
                                    <div className="account_filter text-right">
                                        <button
                                            type="button"
                                            onClick={this.redirectToVisit.bind(this)}
                                            className="site_btn"
                                            disabled={this.state.account_main === undefined ? true : false}>{this.state.account_main === undefined ? "Choose One Account" : "Update Visit"}</button>
                                    </div> {/* account_filter */}
                                    <div className="account_list_wrapper position_relative">
                                        <div className={"loader_wrap" + (this.state.loading === true ? "" : " hidden")}><img src={IMAGE.loader} alt="" /></div>
                                        {this.state.accounts.map((item, index) => (
                                            <AccountList
                                                key={index}
                                                account={item}
                                                updateVisitData={(e, account) => this.updateVisitData(e, account)} />
                                        ))}
                                        {this.state.accounts.length <= 0 && <div className="text-center">No accounts found</div>}
                                        {this.state.showLoadMore === true && <div className="text-center load_more_wrapper">
                                            <button type="button" className="load_more_btn" onClick={this.loadMoreAccount.bind(this)}>Load More</button>
                                        </div>}
                                    </div> {/* account_list_wrapper */}
                                </div>}
                                {this.state.account_type === "My Team Accounts" && <div>
                                    <div className="account_list_wrapper position_relative">
                                        <div className={"loader_wrap" + (this.state.loading === true ? "" : " hidden")}><img src={IMAGE.loader} alt="" /></div>
                                        {this.state.accounts.map((item, index) => (
                                            <AccountList
                                                key={index}
                                                account={item}
                                                teamAccounts={true}  />
                                        ))}
                                        {this.state.showLoadMore === true && <div className="text-center load_more_wrapper">
                                            <button type="button" className="load_more_btn" onClick={this.loadMoreAccount.bind(this)}>Load More</button>
                                        </div>}
                                    </div> {/* account_list_wrapper */}
                                </div>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(Accounts);
