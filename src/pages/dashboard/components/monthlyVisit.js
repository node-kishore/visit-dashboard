import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import Filter from '../../../common/filter/common_filter';
import IMAGE from '../../../common/image';
import { Bar } from 'react-chartjs-2';
// import 'chartjs-plugin-datalabels';
import axios from 'axios';
import ENDPOINTS from '../../../common/endpoints';

class MonthlyVisit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userwisecountData: {},
			loading: false,
			barChartOptions: {
				legend: {
					position: 'bottom'
				},
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						id: 'A',
						type: 'linear',
						position: 'left',
					}, {
						id: 'B',
						type: 'linear',
						position: 'right',
						ticks: {
							max: 20,
							min: 0
						}
					}],
					xAxes: [{
			            barPercentage: 0.4
			        }]
				}
			}
        }
    }

	componentWillUnmount() {
        this.setState({
			userwisecountData: {},
			loading: false
        })
    }

	onfilterApply(e) {
		// console.log(e);
		// let fromDate = moment().subtract(30, 'days').format(dateFormat);
        // let toDate = moment().format(dateFormat);
		let users = e.selectedUsers.map((elem) => {
			return elem.id
		})
		this.getUserWiseCountData(users, e.monthNumberSelected);
	}

    getUserWiseCountData(users, n_months) {
		this.setState({
			loading: true
		})
        let req = {
            "n_months": n_months,
            "user_ids": users.length <= 0 ? [JSON.parse(localStorage.getItem("userData")).user_id] : users
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.post(ENDPOINTS.user_wise_count, req, axiosConfig)
            .then(res => {
                // console.log(res);
				if(res.data.status && res.data.status == 401) {
                    this.props.history.push('/');
                }
                else {
					let response = res.data;
					response.labels = response.labels.map(elem => {
						return elem.split(" ")[1] + " " + elem.split(" ")[2]
					})
					// console.log(Math.max(...response.datasets[0].data));
	                this.setState({
						loading: false,
	                    userwisecountData: response,
						barChartOptions: {
							legend: {
								position: 'bottom'
							},
							maintainAspectRatio: false,
							scales: {
								yAxes: [{
									id: 'A',
									type: 'linear',
									position: 'left',
								}, {
									id: 'B',
									type: 'linear',
									position: 'right',
									ticks: {
										max: Math.max(...response.datasets[0].data) + 5,
										min: 0
									}
								}],
								xAxes: [{
						            barPercentage: 0.4
						        }]
							}
						}
	                })
				}
            })
    }

    componentDidMount() {
		let currentUser = JSON.parse(localStorage.getItem("userData")).user_id;
        this.getUserWiseCountData([currentUser], 6);
    }

    render() {
        return (
            <div className="col-md-6 mb-30px">
                <div className="card">
                    <div className="card_header">
                        <div className="title">
                            Monthly Visit Trend
                        </div>
                        <Filter
							onfilterApply={this.onfilterApply.bind(this)}
							filterByUser="true"
							filterByDate="true"
							filterId="userwise_filter"
							dateRange="6 Months"
							dateFormat="without_time"
							onlyMonthsFilter="true" />
                    </div>
                    <div className="chart_body position_relative">
						<div className={"loader_wrap" + (this.state.loading === true ? "" : " hidden")}><img src={IMAGE.loader} alt="" /></div>
                        <Bar data={this.state.userwisecountData} options={this.state.barChartOptions} />
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(MonthlyVisit);
