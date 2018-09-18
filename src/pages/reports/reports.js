import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../common/header';
import Sidebar from '../../common/sidebar';
import axios from 'axios';
import ENDPOINTS from '../../common/endpoints';
import IMAGE from '../../common/image';
import ReactTable from "react-table";
import 'react-table/react-table.css'

function updateVisitData(e, account) {
    // console.log(e.target.checked);
    // console.log(account);
    // console.log(this.state);
    let accountIdList = this.state.accountIdList;
    let star_type_id = this.state.star_type_id;
    let star_type_dict = {};
    if(e.target.checked === true) {
        accountIdList.push(account.account_id.toString());
        if(account.star_type != "") {
            star_type_id.push(account.account_id.toString());
        }
        for(let i of star_type_id) {
            star_type_dict[i] = parseInt(i);
        }
        this.setState({
            accountIdList: accountIdList,
            star_type_id: star_type_id,
            star_type_dict: star_type_dict
        })
    }
}

function AccountList(props) {
    return (
        <div className="account_list_row">
            {/* <div className="account_checkbox">
                <input type="checkbox" id={"acc_" + props.account.account_id} onChange={(e) => updateVisitData(e, props.account)} />
                <label htmlFor={"acc_" + props.account.account_id}></label>
            </div> */}
            <div className="account_row_box">
                <div className="account_row_box_header">
                    <ul>
                        <li>
                            <p>Account Name</p>
                            <p>{props.account.account_name}</p>
                        </li>
                        <li>
                            <p>Frequency Taken</p>
                            <p>{props.account.frequency_type}</p>
                        </li>
                        <li>
                            <p>Next Visit Date</p>
                            <p>{props.account.next_visit_date}</p>
                        </li>
                        <li>
                            <p>Note Type</p>
                            <p>{props.account.note_types}</p>
                        </li>
                    </ul>
                </div>
                <div className="account_row_box_body">
                    <p>Notes - <span>{props.account.notes}</span></p>
                    <p>Star Type - <span>{props.account.star_type}</span></p>
                    <p>Visit Date - <span>{props.account.visit_date}</span></p>
                    <p>Location - <span>{props.account.visit_submitted_location == "" || props.account.visit_submitted_location == null ? "NA" : props.account.visit_submitted_location}</span></p>
                    <p>Visit Type - <span>{props.account.visit_types}</span></p>
                </div>
            </div>
        </div>
    )
}

class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            page_number: 1,
            loading: false,
            showLoadMore: false,
            accountIdList: [],
            star_type_id: [],
            star_type_dict: {
                "456": 1
            }
        }
        updateVisitData = updateVisitData.bind(this);
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
        axios.get(ENDPOINTS.my_team_report + "?page_no=" + page_number + "&pagination_size=10000", axiosConfig)
            .then(res => {
				if(res.data.status && res.data.status == 400) {
                    this.props.history.push('/');
                }
                else {
	                this.setState({
						loading: false,
	                    accounts: this.state.accounts.concat(res.data)
	                })
                    if(res.data.length >= 20) {
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
    }

    componentWillUnmount() { }

    loadMoreAccount() {
        let toBePageNumber = this.state.page_number + 1;
        this.getAccount(toBePageNumber);
        this.setState({
            page_number: toBePageNumber
        })
    }

    redirectToVisit() {
        this.props.history.push({
            pathname: '/update-visits',
            state: {
                accountIdList: this.state.accountIdList.join(","),
                star_type_id: this.state.star_type_id.join(","),
                star_type_dict: this.state.star_type_dict
            }
        })
    }

    render() {

        const data = []

        const columns = [{
            Header: 'Account Name',
            accessor: 'account_name'
        }, {
            Header: 'Frequency Type',
            accessor: 'frequency_type'
        }, {
            Header: 'Next Visit Date',
            accessor: 'next_visit_date'
        }, {
            Header: 'Note Types',
            accessor: 'note_types'
        }, {
            Header: 'Notes',
            accessor: 'notes'
        }, {
            Header: 'Star Type',
            accessor: 'star_type'
        }, {
            Header: 'Visit Date',
            accessor: 'visit_date'
        }, {
            Header: 'Visit Type',
            accessor: 'visit_types'
        }]

        return (
            <div>

                <Header />

                <div className="main_body">

                    <Sidebar />

                    <div className="content_area">

                        <div className="row">

                            <div className="col-md-12">
                                <div className="page_title">
                                    <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 32 32">
                                        <g>
                                            <g id="news">
                                                <path d="M29,0H7C5.343,0,4,1.342,4,3v2H3C1.343,5,0,6.342,0,8v20c0,2.209,1.791,4,4,4h24 c2.209,0,4-1.791,4-4V3C32,1.342,30.656,0,29,0z M30,28c0,1.102-0.898,2-2,2H4c-1.103,0-2-0.898-2-2V8c0-0.552,0.448-1,1-1h1v20 c0,0.553,0.447,1,1,1s1-0.447,1-1V3c0-0.552,0.448-1,1-1h22c0.551,0,1,0.448,1,1V28z"></path>
                                                <path d="M19.498,13.005h8c0.277,0,0.5-0.224,0.5-0.5s-0.223-0.5-0.5-0.5h-8c-0.275,0-0.5,0.224-0.5,0.5 S19.223,13.005,19.498,13.005z"></path>
                                                <path d="M19.498,10.005h8c0.277,0,0.5-0.224,0.5-0.5s-0.223-0.5-0.5-0.5h-8c-0.275,0-0.5,0.224-0.5,0.5 S19.223,10.005,19.498,10.005z"></path>
                                                <path d="M19.498,7.005h8c0.277,0,0.5-0.224,0.5-0.5s-0.223-0.5-0.5-0.5h-8c-0.275,0-0.5,0.224-0.5,0.5 S19.223,7.005,19.498,7.005z"></path>
                                                <path d="M16.5,27.004h-8c-0.276,0-0.5,0.225-0.5,0.5c0,0.277,0.224,0.5,0.5,0.5h8 c0.275,0,0.5-0.223,0.5-0.5C17,27.229,16.776,27.004,16.5,27.004z"></path>
                                                <path d="M16.5,24.004h-8c-0.276,0-0.5,0.225-0.5,0.5c0,0.277,0.224,0.5,0.5,0.5h8 c0.275,0,0.5-0.223,0.5-0.5C17,24.229,16.776,24.004,16.5,24.004z"></path>
                                                <path d="M16.5,21.004h-8c-0.276,0-0.5,0.225-0.5,0.5c0,0.277,0.224,0.5,0.5,0.5h8 c0.275,0,0.5-0.223,0.5-0.5C17,21.229,16.776,21.004,16.5,21.004z"></path>
                                                <path d="M27.5,27.004h-8c-0.277,0-0.5,0.225-0.5,0.5c0,0.277,0.223,0.5,0.5,0.5h8 c0.275,0,0.5-0.223,0.5-0.5C28,27.229,27.775,27.004,27.5,27.004z"></path>
                                                <path d="M27.5,24.004h-8c-0.277,0-0.5,0.225-0.5,0.5c0,0.277,0.223,0.5,0.5,0.5h8 c0.275,0,0.5-0.223,0.5-0.5C28,24.229,27.775,24.004,27.5,24.004z"></path>
                                                <path d="M27.5,21.004h-8c-0.277,0-0.5,0.225-0.5,0.5c0,0.277,0.223,0.5,0.5,0.5h8 c0.275,0,0.5-0.223,0.5-0.5C28,21.229,27.775,21.004,27.5,21.004z"></path>
                                                <path d="M27.5,15.004h-19c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5h19c0.275,0,0.5-0.224,0.5-0.5 S27.775,15.004,27.5,15.004z"></path>
                                                <path d="M27.5,18.004h-19c-0.276,0-0.5,0.225-0.5,0.5c0,0.277,0.224,0.5,0.5,0.5h19 c0.275,0,0.5-0.223,0.5-0.5C28,18.229,27.775,18.004,27.5,18.004z"></path>
                                                <path d="M9,13h7c0.553,0,1-0.447,1-1V5.004c0-0.553-0.447-1-1-1H9c-0.553,0-1,0.447-1,1V12 C8,12.552,8.447,13,9,13z M10,6h5v5h-5V6z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    Reports
                                </div> {/* page_title */}
                                {/* <ol className="breadcrumb">
                                    <li className="active"><a href="#">My Accounts</a></li>
                                    <li><a href="#">My Team Accounts</a></li>
                                </ol> */} {/* breadcrumb */}
                                <div className="account_filter text-right">
                                    {/* <button type="button" onClick={this.redirectToVisit.bind(this)} className="site_btn">Update Visits</button> */}
                                </div> {/* account_filter */}
                                <div className="account_list_wrapper position_relative">
                                    <div className={"loader_wrap" + (this.state.loading === true ? "" : " hidden")}><img src={IMAGE.loader} alt="" /></div>
                                    <ReactTable
                                        filterable
                                        defaultPageSize={50}
                                        style={{
                                            height: "76vh"
                                        }}
                                        data={this.state.accounts}
                                        columns={columns} />
                                    {/*{this.state.accounts.map((item, index) => (
                                        <AccountList key={index} account={item} />
                                    ))}
                                    {this.state.showLoadMore === true && <div className="text-center load_more_wrapper">
                                        <button type="button" className="load_more_btn" onClick={this.loadMoreAccount.bind(this)}>Load More</button>
                                    </div>}*/}
                                </div> {/* account_list_wrapper */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(Reports);
