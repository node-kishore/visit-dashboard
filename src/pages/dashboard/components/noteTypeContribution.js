import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import moment from 'moment';
import IMAGE from '../../../common/image';
import Filter from '../../../common/filter/common_filter';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import ENDPOINTS from '../../../common/endpoints';
const dateFormat = "YYYY-MM-DD HH:mm:ss";

const noteTypeOptions = {
	legend: {
		position: 'right'
	},
    maintainAspectRatio: false
}

class NoteType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteTypeData: {},
			loading: false
        }
    }

	componentWillUnmount() {
        this.setState({
			noteTypeData: {},
			loading: false
        })
    }

	onfilterApply(e) {
		let fromDate = moment().startOf('month').format(dateFormat);
        let toDate = moment().format(dateFormat);
		let users = e.selectedUsers.map((elem) => {
			return elem.id
		})
		this.getNoteTypeData(users, fromDate, toDate);
	}

    getNoteTypeData(users, fromDate, toDate) {
		this.setState({
			loading: true
		})
        let req = {
            "from_date": fromDate,
            "to_date": toDate,
            "user_ids": users.length <= 0 ? [JSON.parse(localStorage.getItem("userData")).user_id] : users
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.post(ENDPOINTS.note_type_contribution, req, axiosConfig)
            .then(res => {
                // console.log(res);
				if(res.data.status && res.data.status == 401) {
                    this.props.history.push('/');
                }
                else {
	                this.setState({
	                    noteTypeData: res.data,
						loading: false
	                })
				}
            })
    }

    componentDidMount() {
        let fromDate = moment().subtract(30, 'days').format(dateFormat);
        let toDate = moment().format(dateFormat);
		let currentUserId = JSON.parse(localStorage.getItem("userData")).user_id;
        this.getNoteTypeData([currentUserId], fromDate, toDate);
    }

    render() {
        return (
            <div className="col-md-6 mb-30px">
                <div className="card">
                    <div className="card_header">
                        <div className="title">
                            Note Type Contribution
                        </div>
                        <Filter
							onfilterApply={this.onfilterApply.bind(this)}
							filterByUser="true"
							filterByDate="true"
							filterId="notetype_filter"
							dateRange="No Range" />
                    </div>
                    <div className="chart_body">
						<div className={"loader_wrap" + (this.state.loading == true ? "" : " hidden")}><img src={IMAGE.loader} alt="" /></div>
                        <Doughnut data={this.state.noteTypeData} options={noteTypeOptions} />
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(NoteType);
