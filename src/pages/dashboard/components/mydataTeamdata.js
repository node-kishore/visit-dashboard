import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import moment from 'moment';
import CountUp from 'react-countup';
import IMAGE from '../../../common/image';
import { Dropdown, MenuItem } from 'react-bootstrap';
import Filter from '../../../common/filter/common_filter';
import axios from 'axios';
import ENDPOINTS from '../../../common/endpoints';
const dateFormat = "YYYY-MM-DD";

function onfilterApply(e) {
    updateMyData(e);
}

function MyData(props) {
    if(props.myData === true) {
        return <Filter
                    onfilterApply={onfilterApply.bind(this)}
                    filterByUser="false"
                    filterByDate="true"
                    dateFormat="without_time"
                    onlyCustomDate={props.onlyCustomDate}
                    filterBtnLabel={props.filterBtnLabel}
                    filterId="mydata_filter"
                    dateRange="No Range" />
    }
    return <Filter
                    onfilterApply={onfilterApply.bind(this)}
                    filterByUser="true"
                    filterByDate="true"
                    dateFormat="without_time"
                    onlyCustomDate={props.onlyCustomDate}
                    filterBtnLabel={props.filterBtnLabel}
                    filterId="mydata_filter"
                    dateRange="No Range" />
}

function updateMyData(val) {
    console.log(val);
    let selectedUser = val.selectedUsers.map(elem => {
        return elem.id
    })
    this.setState({
        filterActive: ""
    })
    this.getMyData(val.startDate, val.endDate, this.state.myDataActive, selectedUser);
}

class MyDataTeamData extends Component {

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
            allSubordinates: []
        }
        updateMyData = updateMyData.bind(this);
    }

    componentWillUnmount() {
        this.setState({
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
            activityLoading: false
        })
    }

    getMyData(fromDate, toDate, data_type, userIds) {
        this.setState({
            myDataLoading: true
        })
        let req = {};
        if(data_type === true) {
            req = {
                "from_date": fromDate,
                "to_date": toDate,
                "my_data": 1
            }
        }
        else {
            req = {
                "from_date": fromDate,
                "to_date": toDate,
                "my_data": 0,
                "user_ids": userIds
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.post(ENDPOINTS.my_data, req, axiosConfig)
            .then(res => {
                // console.log(res);
                if(res.data.status && res.data.status == 401) {
                    this.props.history.push('/');
                }
                else {
                    if(typeof(res.data) === "object") {
                        this.setState({
                            myTeamData: {
                                account_mapped: res.data[0]["Accounts Mapped"],
                                total_visits: res.data[1]["Total Visits"],
                                account_touch_base: res.data[2]["Account Touch Based"],
                                visits_per_day: res.data[3]["Visits Per Day"]
                            },
                            myDataLoading: false
                        })
                    }
                    else {
                        // let response = JSON.toString(res.data);
                        // console.log(response);
                    }
                }
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
        this.getAllSubordinates();
        let fromDate = moment().startOf('month').format(dateFormat);
        let toDate = moment().format(dateFormat);
        // console.log(fromDate);
        // console.log(toDate);
        this.getMyData(fromDate, toDate, true, []);
        this.setState({
            username: JSON.parse(localStorage.getItem("userData")).user_name.split(" ")[0]
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

    changeTab(val) {
        if(val === "My Data") {
            this.setState({
                myDataActive: true,
                filterActive: "MTD"
            })
            let fromDate = moment().startOf('month').format(dateFormat);
            let toDate = moment().format(dateFormat);
            this.getMyData(fromDate, toDate, true, []);
        }
        if(val === "Team Data") {
            this.setState({
                myDataActive: false,
                filterActive: "MTD"
            })
            let fromDate = moment().startOf('month').format(dateFormat);
            let toDate = moment().format(dateFormat);
            let allIds = this.getAllUserId(this.state.allSubordinates);
            this.getMyData(fromDate, toDate, false, allIds);
        }
    }

    filterDate(val){
        this.setState({
            filterActive: val
        })
        if(val === "Today") {
            let startDate = moment(new Date()).format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            let dataType = this.state.myDataActive === true ? 1 : 0;
            this.getMyData(startDate, endDate, dataType, []);
        }
        else if(val === "Yesterday") {
            let startDate = moment(new Date()).add(-1,'days').format(dateFormat);
            let endDate = moment(new Date()).add(-1,'days').format(dateFormat);
            let dataType = this.state.myDataActive === true ? 1 : 0;
            this.getMyData(startDate, endDate, dataType, []);
        }
        else if(val === "Last 7 Days") {
            let startDate = moment(new Date()).add(-6,'days').format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            let dataType = this.state.myDataActive === true ? 1 : 0;
            this.getMyData(startDate, endDate, dataType, []);
        }
        else if(val === "Last 30 Days") {
            let startDate = moment(new Date()).add(-29,'days').format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            let dataType = this.state.myDataActive === true ? 1 : 0;
            this.getMyData(startDate, endDate, dataType, []);
        }
        else if(val === "MTD") {
            let startDate = moment().startOf('month').format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            let dataType = this.state.myDataActive === true ? 1 : 0;
            this.getMyData(startDate, endDate, dataType, []);
        }
        else if(val === "Last Month") {
            let startDate = moment(new Date()).add(-1,'days').startOf('month').format(dateFormat);
            let endDate = moment(new Date()).add(-1,'days').endOf('month').format(dateFormat);
            let dataType = this.state.myDataActive === true ? 1 : 0;
            this.getMyData(startDate, endDate, dataType, []);
        }
    }

    render() {
        return (
            <div className="col-md-12">

                <div className="overview_header">
                    <h2><img src={IMAGE.home_ico_blue} alt="" />Overview</h2>
                    <p>Welcome Back, {this.state.username}</p>
                </div>

                <div className="tab_header">
                    <div className="tab_nav">
                        <ul>
                            <li onClick={() => this.changeTab("My Data")} className={(this.state.myDataActive === true ? "active" : "")}>
                                <img src={IMAGE.user} alt="" className={(this.state.myDataActive === true ? "" : "hidden")} />
                                <img src={IMAGE.gray_user} alt="" className={(this.state.myDataActive === false ? "" : "hidden")} />
                                My Data
                            </li>
                            <li onClick={() => this.changeTab("Team Data")} className={(this.state.myDataActive === false ? "active" : "")}>
                                <img src={IMAGE.users} alt="" className={(this.state.myDataActive === true ? "" : "hidden")} />
                                <img src={IMAGE.blue_users} alt="" className={(this.state.myDataActive === false ? "" : "hidden")} />
                                Team Data
                            </li>
                        </ul>
                    </div>
                    <div className="filter">
                        {/*<Dropdown id="dropdown-custom-1">
                            <Dropdown.Toggle className="filter_box" noCaret>
                                <img src={IMAGE.calendar} alt="" className="calendar_ico" />
                                MTD
                                <img src={IMAGE.expand_btn} alt="" className="dropdown_ico" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="super-colors pull-right">
                                <button
                                    className={"filter_btn" + (this.state.filterType === "Today" ? " active" : "")}
                                    onClick={() => this.changeFilter("Today")}>Today</button>
                                <button
                                    className={"filter_btn" + (this.state.filterType === "Yesterday" ? " active" : "")}
                                    onClick={() => this.changeFilter("Yesterday")}>Yesterday</button>
                                <button
                                    className={"filter_btn" + (this.state.filterType === "Last 7 Days" ? " active" : "")}
                                    onClick={() => this.changeFilter("Last 7 Days")}>Last 7 Days</button>
                                <button
                                    className={"filter_btn" + (this.state.filterType === "Last 30 Days" ? " active" : "")}
                                    onClick={() => this.changeFilter("Last 30 Days")}>Last 30 Days</button>
                                <button
                                    className={"filter_btn" + (this.state.filterType === "This Month" ? " active" : "")}
                                    onClick={() => this.changeFilter("This Month")}>This Month</button>
                                <button
                                    className={"filter_btn" + (this.state.filterType === "Last Month" ? " active" : "")}
                                    onClick={() => this.changeFilter("Last Month")}>Last Month</button>
                            </Dropdown.Menu>
                        </Dropdown>*/}
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
                                className={"other_filter_btn" + (this.state.filterActive === "Last 30 Days" ? " active" : "")}
                                onClick={() => this.filterDate("Last 30 Days")}>Last 30 Days</button>
                            <button
                                type="button"
                                className={"other_filter_btn" + (this.state.filterActive === "MTD" ? " active" : "")}
                                onClick={() => this.filterDate("MTD")}>MTD</button>
                            <button
                                type="button"
                                className={"other_filter_btn" + (this.state.filterActive === "Last Month" ? " active" : "")}
                                onClick={() => this.filterDate("Last Month")}>Last Month</button>
                        </div>
                        <MyData myData={this.state.myDataActive} onlyCustomDate={true} filterBtnLabel="Custom" />
                        {/*<CommonFilter filterByUser="true" filterByDate="true" />*/}
                    </div>
                </div>

                <div className="dashboard_boxes mb-30px position_relative">
                    <div className={"loader_wrap" + (this.state.myDataLoading === true ? "" : " hidden")}><img src={IMAGE.loader} alt="" /></div>
                    <div className="box box1">
                        <CountUp end={this.state.myTeamData.account_mapped} duration={2} redraw={true} />
                        {/*<span>{this.state.myTeamData != undefined && this.state.myTeamData.account_mapped}&nbsp;</span>*/}
                        &nbsp;Accounts Mapped
                        <div className="dashboard_icons">
                            <img src={IMAGE.account} />
                        </div>
                    </div>
                    <div className="box box2">
                        <CountUp end={this.state.myTeamData.total_visits} duration={2} redraw={true} />
                        {/*<span>{this.state.myTeamData != undefined && this.state.myTeamData.total_visits}&nbsp;</span>*/}
                        &nbsp;Total Visits
                        <div className="dashboard_icons">
                            <img src={IMAGE.house_visiting} />
                        </div>
                    </div>
                    <div className="box box3">
                        <CountUp end={this.state.myTeamData.account_touch_base} duration={2} redraw={true} />
                        {/*<span>{this.state.myTeamData != undefined && this.state.myTeamData.account_touch_base}&nbsp;</span>*/}
                        &nbsp;Accounts Touch Based
                        <div className="dashboard_icons">
                            <img src={IMAGE.finger_touching_screen} />
                        </div>
                    </div>
                    <div className="box box4">
                        <CountUp end={this.state.myTeamData.visits_per_day} duration={2} redraw={true} />
                        {/*<span>{this.state.myTeamData != undefined && this.state.myTeamData.visits_per_day}&nbsp;</span>*/}
                        &nbsp;Visits Per Day
                        <div className="dashboard_icons">
                            <img src={IMAGE.calendar_mydata} />
                        </div>
                    </div>
                </div>

            </div>

        )
    }

}

export default withRouter(MyDataTeamData);
