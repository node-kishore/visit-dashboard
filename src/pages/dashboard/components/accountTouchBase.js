import React, { Component } from 'react';
import moment from 'moment';
import { withRouter} from 'react-router-dom';
import IMAGE from '../../../common/image';
import Filter from '../../../common/filter/common_filter';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import ENDPOINTS from '../../../common/endpoints';
const dateFormat = "YYYY-MM-DD";

const barChartOptions = {
	legend: {
		position: 'bottom'
	},
    maintainAspectRatio: false,
    scales: {
        xAxes: [{
            barPercentage: 0.4
        }]
    }
}

class AccountTouchBase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountTouchBaseData: {},
			filterActive: "Last 10 Days",
			loading: false
        }
    }

	componentWillUnmount() {
        this.setState({
			accountTouchBaseData: {},
			filterActive: "",
			loading: false
        })
    }

	onfilterApply(e) {
		let fromDate = moment().subtract(30, 'days').format(dateFormat);
        let toDate = moment().format(dateFormat);
		let users = e.selectedUsers.map((elem) => {
			return elem.id
		})
		this.getAccountTouchBaseData(users, fromDate, toDate);
	}

    getAccountTouchBaseData(users, fromDate, toDate) {
		this.setState({
			loading: true
		})
        let req = {
            "from_date": fromDate,
            "to_date": toDate,
            "user_ids": users
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.post(ENDPOINTS.account_touch_base, req, axiosConfig)
            .then(res => {
                // console.log(res);
				if(res.data.status && res.data.status == 401) {
                    this.props.history.push('/');
                }
                else {
	                this.setState({
						loading: false,
	                    accountTouchBaseData: res.data
	                })
				}
            })
    }

    componentDidMount() {
		const userData = JSON.parse(localStorage.getItem("userData"));
		let fromDate = moment().subtract(9, 'days').format(dateFormat);
        let toDate = moment().format(dateFormat);
        this.getAccountTouchBaseData([userData.user_id], fromDate, toDate);
		this.setState({
			users: [userData.user_id]
		})
    }

	filterDate(val) {
		this.setState({
			filterActive: val
		})
		if(val === "Today") {
            let startDate = moment(new Date()).format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            this.getAccountTouchBaseData(this.state.users, startDate, endDate);
        }
        else if(val === "Yesterday") {
            let startDate = moment(new Date()).add(-1,'days').format(dateFormat);
            let endDate = moment(new Date()).add(-1,'days').format(dateFormat);
            this.getAccountTouchBaseData(this.state.users, startDate, endDate);
        }
        else if(val === "Last 7 Days") {
            let startDate = moment(new Date()).add(-6,'days').format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            this.getAccountTouchBaseData(this.state.users, startDate, endDate);
        }
        else if(val === "Last 10 Days") {
            let startDate = moment(new Date()).add(-9,'days').format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            this.getAccountTouchBaseData(this.state.users, startDate, endDate);
        }
	}

	filterAccountTouchBase(e) {
		let users = e.selectedUsers.map((elem) => {
			return elem.id
		})
		this.getAccountTouchBaseData(users, e.startDate, e.endDate);
	}

    render() {
        return (
            <div className="col-md-12 mb-30px">
                <div className="card">
                    <div className="card_header">
                        <div className="title">
                            Account Touch Base Trend
                        </div>
						<div className="filter">
                            <div className="other_filter">
								<button
	                                type="button"
	                                className={"other_filter_btn" + (this.state.filterActive === "Today" ? " active" : "")}
	                                onClick={() => this.filterDate("Today")}>Today</button>
	                            <button
	                                type="button"
	                                className={"other_filter_btn" + (this.state.filterActive === "Yesterday" ? " active" : "")}
	                                onClick={() => this.filterDate("Yesterday")}>Yesterday</button>
	                            <button
	                                type="button"
	                                className={"other_filter_btn" + (this.state.filterActive === "Last 7 Days" ? " active" : "")}
	                                onClick={() => this.filterDate("Last 7 Days")}>Last 7 Days</button>
	                            <button
	                                type="button"
	                                className={"other_filter_btn" + (this.state.filterActive === "Last 10 Days" ? " active" : "")}
	                                onClick={() => this.filterDate("Last 10 Days")}>Last 10 Days</button>
                            </div>
                            <Filter
                                onfilterApply={this.filterAccountTouchBase.bind(this)}
                                filterByUser="true"
                                filterByDate="true"
								dateFormat="without_time"
                                onlyCustomDate={true}
                                filterBtnLabel="Custom"
								filterId="account_filter"
								dateRange="10 Days" />
                        </div>
                    </div>
                    <div className="chart_body">
						<div className={"loader_wrap" + (this.state.loading === true ? "" : " hidden")}><img src={IMAGE.loader} alt="" /></div>
                        <Bar data={this.state.accountTouchBaseData} options={barChartOptions} />
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(AccountTouchBase);
