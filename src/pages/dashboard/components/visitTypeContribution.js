import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import moment from 'moment';
import Filter from '../../../common/filter/common_filter';
import IMAGE from '../../../common/image';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import ENDPOINTS from '../../../common/endpoints';
const dateFormat = "YYYY-MM-DD HH:mm:ss";

const doughnutOptions = {
	legend: {
		position: 'bottom'
	},
    maintainAspectRatio: false
}

class VisitType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visitTypeContributionData: {},
			loading: false
        }
    }

	componentWillUnmount() {
        this.setState({
			visitTypeContributionData: {},
			loading: false
        })
    }

	onfilterApply(e) {
		let fromDate = moment().startOf('month').format(dateFormat);
        let toDate = moment().format(dateFormat);
		let users = e.selectedUsers.map((elem) => {
			return elem.id
		})
		this.getVisitTypeData(users.length <= 0 ? [1] : users, e.startDate, e.endDate);
	}

    getVisitTypeData(usersIds, fromDate, toDate) {
		this.setState({
			loading: true
		})
        let req = {
            "from_date": fromDate,
            "to_date": toDate,
            "user_ids": usersIds
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.post(ENDPOINTS.visit_type_contribution, req, axiosConfig)
            .then(res => {
                // console.log(res);
				if(res.data.status && res.data.status == 401) {
                    this.props.history.push('/');
                }
                else {
	                this.setState({
	                    visitTypeContributionData: res.data,
						loading: false
	                })
				}
            })
    }

    componentDidMount() {
        let fromDate = moment().subtract(30, 'days').format(dateFormat);
        let toDate = moment().format(dateFormat);
		let currentUserId = JSON.parse(localStorage.getItem("userData")).user_id;
        this.getVisitTypeData([currentUserId], fromDate, toDate);
    }

    render() {
        return (
            <div className="col-md-6 mb-30px">
                <div className="card">
                    <div className="card_header">
                        <div className="title">
                            Visit Type Contribution
                        </div>
                        <Filter
							onfilterApply={this.onfilterApply.bind(this)}
							filterByUser="true"
							filterByDate="true"
							filterId="visit_filter"
							dateRange="No Range" />
                    </div>
                    <div className="chart_body doughnut_chart">
						<div className={"loader_wrap" + (this.state.loading == true ? "" : " hidden")}><img src={IMAGE.loader} alt="" /></div>
                        <Doughnut data={this.state.visitTypeContributionData} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(VisitType);
