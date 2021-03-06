import React, { Component } from 'react';
import moment from 'moment';
import { withRouter} from 'react-router-dom';
import Filter from '../../../common/filter/common_filter';
import IMAGE from '../../../common/image';
import ENDPOINTS from '../../../common/endpoints';
import axios from 'axios';
const dateFormat = "YYYY-MM-DD";

function PastActivity(props) {
    // console.log(props);
    return (
        <div>
            {props.activities.map((item, index) => (
                <li key={index}>
                    <div className="activity_date">
                        {item.title}
                    </div>
                    <div className="activity_col">
                        {item.activities.map((innerItem, innerIndex) => (
                            <div className="activity_single" key={innerIndex}>
                                <div className="activity_single_left">
                                    <p><span>{innerItem}</span> <span>at {item.time}</span></p>
                                </div>
                                <div className="activity_single_left">
                                    <div className="activity_profile_img">
                                        <svg version="1.1" id="Layer_1" x="0px" y="0px"
                                        	 viewBox="0 0 258.75 258.75" style={{enableBackground: "new 0 0 258.75 258.75"}}>
                                        	<g>
                                        		<circle cx="129.375" cy="60" r="60"/>
                                        		<path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z"/>
                                        	</g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </li>
            ))}
        </div>
    )
}

function UpcomingActivity(props) {
    return (
        <div>
            {props.activities.map((item, index) => (
                <li key={index}>
                    <div className="activity_date">
                        {item.title}
                    </div>
                    <div className="activity_col">
                        {item.activities.map((innerItem, innerIndex) => (
                            <div className="activity_single" key={innerIndex}>
                                <div className="activity_single_left">
                                    <p><span>{innerItem.activity}</span></p>
                                </div>
                                <div className="activity_single_left">
                                    <div className="activity_profile_img">
                                        <svg version="1.1" id="Layer_1" x="0px" y="0px"
                                        	 viewBox="0 0 258.75 258.75" style={{enableBackground: "new 0 0 258.75 258.75"}}>
                                        	<g>
                                        		<circle cx="129.375" cy="60" r="60"/>
                                        		<path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z"/>
                                        	</g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </li>
            ))}
        </div>
    )
}

class Activity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterType: "Last 30 Days",
            myTeamData: {
                account_mapped: 0,
                total_visits: 0,
                account_touch_base: 0,
                visits_per_day: 0
            },
            myDataActive: true,
            activitiesActive: "Past Activities",
            whichActivity: "My Activity",
            filterActive: "MTD",
            userName: "",
            activityFilter: "Last 7 Days",
            activities: [],
            myDataLoading: false,
            activityLoading: false,
            selectedUser: []
        }
    }

    changeActivities(toActiveActivities) {
        // console.log(toActiveActivities);
        this.setState({
            activitiesActive: toActiveActivities,
            existUser: undefined
        })
        if(toActiveActivities === "Past Activities") {
            this.setState({
                activityFilter: "Last 7 Days"
            })
            this.getActivities(toActiveActivities, this.state.whichActivity, this.state.activityStart, this.state.activityEnd, this.state.selectedUser);
        }
        if(toActiveActivities === "Upcoming Activities") {
            this.setState({
                activityFilter: "Next 7 Days"
            })
            this.getActivities(toActiveActivities, this.state.whichActivity, this.state.activityEnd, this.state.upcomingActivityEnd, this.state.selectedUser);
        }
    }

    getActivities(activityTime, whichActivity, fromDate, toDate, userIds) {
        this.setState({
            activityLoading: true,
            activities: []
        })
        let req = {};
        if(whichActivity == "My Activity") {
            req = {
                "past_acitivity": activityTime === "Past Activities" ? 1 : 0,
                "myactivity": whichActivity === "My Activity" ? 1 : 0,
                "from_date": fromDate,
                "to_date": toDate
            }
        }
        else {
            req = {
                "past_acitivity": activityTime === "Past Activities" ? 1 : 0,
                "myactivity": whichActivity === "My Activity" ? 1 : 0,
                "from_date": fromDate,
                "to_date": toDate,
                "user_ids": userIds
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.post(ENDPOINTS.get_activity, req, axiosConfig)
            .then(res => {
                // console.log(res.data);
                // console.log(res);
                if(res.data.status && res.data.status === 401) {
                    this.props.history.push('/');
                }
                else {
                    this.setState({
                        activities: res.data,
                        activityLoading: false
                    })
                }
            })
    }

    getAllUserId(item) {
        // console.log(item.length);
        let idMap = [];
        let ids = [];
        if(item.length > 0) {
            idMap = item.reduce(function merge(map, node) {
              map[node.id] = node;

              if (Array.isArray(node.users)) {
                node.users.reduce(merge, map);
              }

              return map;
            }, {});
        }
        if(item.length === undefined) {
            idMap = [item].reduce(function merge(map, node) {
              map[node.id] = node;

              if (Array.isArray(node.users)) {
                node.users.reduce(merge, map);
              }

              return map;
            }, {});
        }
        // let allNestedIds = [];
        let idMapKeys = Object.keys(idMap);
        for(let i = 0; i < idMapKeys.length; i++) {
            ids.push(idMap[idMapKeys[i]].id);
        }
        return ids;
    }

    changeMyActivity(whichActivity, activityType) {
        if(whichActivity === "My Activity") {
            this.setState({
                [whichActivity]: activityType
            })
            this.getActivities(this.state.activitiesActive, activityType, this.state.activityStart, this.state.activityEnd, this.state.selectedUser);
        }
        else {
            this.setState({
                [whichActivity]: activityType
            })
            let allIds = this.getAllUserId(this.state.allSubordinates);
            this.setState({
                selectedUser: allIds
            })
            this.getActivities(this.state.activitiesActive, activityType, this.state.activityStart, this.state.activityEnd, allIds);
        }
    }

    filterActivity(val) {
        this.setState({
            activityFilter: val
        })
        if(val === "Today") {
            let startDate = moment(new Date()).format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            this.getActivities(this.state.activitiesActive, this.state.whichActivity, startDate, endDate, this.state.selectedUser);
        }
        else if(val === "Yesterday") {
            let startDate = moment(new Date()).add(-1,'days').format(dateFormat);
            let endDate = moment(new Date()).add(-1,'days').format(dateFormat);
            this.getActivities(this.state.activitiesActive, this.state.whichActivity, startDate, endDate, this.state.selectedUser);
        }
        else if(val === "Last 7 Days") {
            let startDate = moment(new Date()).add(-6,'days').format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            this.getActivities(this.state.activitiesActive, this.state.whichActivity, startDate, endDate, this.state.selectedUser);
        }
    }

    onfilterActivity(e) {
        // console.log(e);
        let selectedUser = e.selectedUsers.map(elem => {
            return elem.id
        })
        this.getActivities(this.state.activitiesActive, this.state.whichActivity, e.startDate, e.endDate, selectedUser);
        this.setState({
            activityStart: e.startDate,
            activityEnd: e.endDate,
            selectedUser: selectedUser
        })
        this.setState({
            existUser: e.allUsers
        })
    }

    getAllSubordinates() {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.get(ENDPOINTS.get_subordinates, axiosConfig)
            .then(res => {
                // console.log(res);
                if(res.data.status && res.data.status == 401) {
                    this.props.history.push('/');
                }
                else {
                    this.setState({
                        allSubordinates: res.data
                    })
                }
            })
    }

    componentDidMount() {
        // let fromDate = moment().startOf('month').format(dateFormat);
        this.getAllSubordinates();
        let toDate = moment().format(dateFormat);
        let activityStart = moment().add(-6, "days").format(dateFormat);
        let upcomingActivityEnd = moment().add(6, "days").format(dateFormat);
        this.getActivities("Past Activities", "My Activity", activityStart, toDate, this.state.selectedUser);
        this.setState({
            username: JSON.parse(localStorage.getItem("userData")).user_name.split(" ")[0],
            activityStart: activityStart,
            activityEnd: toDate,
            upcomingActivityEnd: upcomingActivityEnd
        })
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card activities_box mb-30px">
                    <div className="activities_header">
                        <div className="left">
                            <a
                                onClick={() => this.changeActivities("Past Activities")}
                                href="javascript:void(0)"
                                className={(this.state.activitiesActive === "Past Activities" ? "active" : "")}>Past Activities</a>
                            &nbsp;/&nbsp;
                            <a
                                onClick={() => this.changeActivities("Upcoming Activities")}
                                href="javascript:void(0)"
                                className={(this.state.activitiesActive === "Upcoming Activities" ? "active" : "")}>Upcoming Activities</a>
                        </div>
                        <div className="filter">
                            <div className="other_filter">
                                {this.state.activitiesActive === "Past Activities" && <button
                                    type="button"
                                    className={"other_filter_btn" + (this.state.activityFilter === "Today" ? " active" : "")}
                                    onClick={() => this.filterActivity("Today")}>Today</button>}
                                {this.state.activitiesActive === "Past Activities" && <button
                                    type="button"
                                    className={"other_filter_btn" + (this.state.activityFilter === "Yesterday" ? " active" : "")}
                                    onClick={() => this.filterActivity("Yesterday")}>Yesterday</button>}
                                {this.state.activitiesActive === "Past Activities" && <button
                                    type="button"
                                    className={"other_filter_btn" + (this.state.activityFilter === "Last 7 Days" ? " active" : "")}
                                    onClick={() => this.filterActivity("Last 7 Days")}>Last 7 Days</button>}
                                {this.state.activitiesActive === "Upcoming Activities" && <button
                                    type="button"
                                    className={"other_filter_btn" + (this.state.activityFilter === "Next 7 Days" ? " active" : "")}
                                    onClick={() => this.filterActivity("Next 7 Days")}>Next 7 Days</button>}
                            </div>
                            {this.state.activitiesActive === "Past Activities" && this.state.whichActivity === "My Activity" && <Filter
                                onfilterApply={this.onfilterActivity.bind(this)}
                                filterByUser="false"
                                filterByDate="true"
                                dateFormat="without_time"
                                onlyCustomDate={true}
                                filterBtnLabel="Custom Filter"
                                filterId="activity_filter"
                                dateRange="7 Days" />}
                            {this.state.activitiesActive === "Past Activities" && this.state.whichActivity === "Team Activity" && <Filter
                                existUser={this.state.existUser}
                                onfilterApply={this.onfilterActivity.bind(this)}
                                filterByUser="true"
                                filterByDate="true"
                                dateFormat="without_time"
                                onlyCustomDate={true}
                                filterBtnLabel="Custom Filter"
                                filterId="activity_filter"
                                dateRange="7 Days" />}
                            {this.state.activitiesActive === "Upcoming Activities" && this.state.whichActivity === "My Activity" && <Filter
                                onfilterApply={this.onfilterActivity.bind(this)}
                                filterByUser="false"
                                filterByDate="true"
                                dateFormat="without_time"
                                onlyCustomDate={true}
                                filterBtnLabel="Custom Filter"
                                filterId="activity_filter"
                                dateRange="Next 7 Days"
                                disablePreviousDates={true} />}
                            {this.state.activitiesActive === "Upcoming Activities" && this.state.whichActivity === "Team Activity" && <Filter
                                existUser={this.state.existUser}
                                onfilterApply={this.onfilterActivity.bind(this)}
                                filterByUser="true"
                                filterByDate="true"
                                dateFormat="without_time"
                                onlyCustomDate={true}
                                filterBtnLabel="Custom Filter"
                                filterId="activity_filter"
                                dateRange="Next 7 Days"
                                disablePreviousDates={true} />}
                            <div className="activity_select_wrapper">
                                <button onClick={() => this.changeMyActivity('whichActivity', 'My Activity')} className={"" + (this.state.whichActivity === 'My Activity' ? "active" : "")} type="button">My Activity</button>
                                <span>/</span>
                                <button onClick={() => this.changeMyActivity('whichActivity', 'Team Activity')} className={"" + (this.state.whichActivity === 'Team Activity' ? "active" : "")} type="button">Team Activity</button>
                                {/*<select
                                    className="activity_select"
                                    onChange={this.changeMyActivity.bind(this)}
                                    value={this.state.whichActivity}
                                    name="whichActivity">
                                    <option value="My Activity">My Activity</option>
                                    <option value="Team Activity">Team Activity</option>
                                </select>*/}
                            </div>
                        </div>
                    </div>
                    <div className="activities_body position_relative">
                        <div className={"loader_wrap" + (this.state.activityLoading === true ? "" : " hidden")}><img src={IMAGE.loader} alt="" /></div>
                        <ul className="activities_list">
                            {/*this.state.activities.length <= 0 && */}
                            {this.state.activities.length <= 0 && this.state.activityLoading === false && <div className="no_activity">No Activity Found</div>}
                            {this.state.activitiesActive === "Past Activities" && this.state.activities.length > 0 && <PastActivity activities={this.state.activities} />}
                            {this.state.activitiesActive === "Upcoming Activities" && this.state.activities.length > 0 && <UpcomingActivity activities={this.state.activities} />}
                            {/*{this.state.activities.map((item, index) => (
                                <li key={index}>
                                    <div className="activity_date">
                                        {item.title}
                                    </div>
                                    <div className="activity_col">
                                        {item.activities.map((innerItem, innerIndex) => (
                                            <div className="activity_single" key={innerIndex}>
                                                <div className="activity_single_left">
                                                    <p><span>{innerItem}</span></p>
                                                </div>
                                                <div className="activity_single_left">
                                                    <div className="activity_profile_img"><img alt="" src={IMAGE.profile_img} /></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}*/}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Activity);
