import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import Filter from '../../../common/filter/common_filter';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import ENDPOINTS from '../../../common/endpoints';
import IMAGE from '../../../common/image';

const doughnutOptions = {
	legend: {
		position: 'bottom'
	},
    maintainAspectRatio: false
}

class DailyVisit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trendsData: {},
			loading: false
        }
    }

	componentWillUnmount() {
        this.setState({
			trendsData: {},
			loading: false
        })
    }

    getTrendsData(userIds) {
		this.setState({
			loading: true
		})
        let req = {
            "user_ids": userIds.length <= 0 ? [JSON.parse(localStorage.getItem("userData")).user_id] : userIds
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.post(ENDPOINTS.trends, req, axiosConfig)
            .then(res => {
                // console.log(res);
				if(res.data.status && res.data.status == 401) {
                    this.props.history.push('/');
                }
                else {
	                this.setState({
						loading: false,
	                    trendsData: res.data
	                })
				}
            })
    }

	onfilterApply(e) {
		let users = e.selectedUsers.map((elem) => {
			return elem.id
		})
		this.getTrendsData(users);
	}

    componentDidMount() {
        this.getTrendsData([JSON.parse(localStorage.getItem("userData")).user_id]);
    }

    render() {
        return (
            <div className="col-md-6 mb-30px">
                <div className="card">
                    <div className="card_header">
                        <div className="title">
                            Daily Visit Trend
                        </div>
                        <Filter
							onfilterApply={this.onfilterApply.bind(this)}
							filterByUser="true"
							filterByDate="false"
							filterId="trend_filter"
							dateRange="10 Days" />
                    </div>
                    <div className="chart_body position_relative">
						<div className={"loader_wrap" + (this.state.loading == true ? "" : " hidden")}><img src={IMAGE.loader} alt="" /></div>
                        <Line data={this.state.trendsData} redraw options={doughnutOptions} />
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(DailyVisit);
