import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../common/header';
import Sidebar from '../../common/sidebar';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import ENDPOINTS from '../../common/endpoints';
import IMAGE from '../../common/image';

class Reminder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nextVisitDate: moment().add(1, 'days'),
            updateSuccess: false,
            updateFailure: false
        }
    }

    componentDidMount() {
        console.log(this.props.location)
    }

    componentWillUnmount() { }

    redirectToupdateMeeting() {
        this.props.history.push({
            pathname: '/update-visits',
            state: {
                account: this.props.location.state.account,
                starId: this.props.location.state.starId
            }
        })
    }

    redirectToTodo() {
        this.props.history.push({
            pathname: '/todo',
            state: {
                account: this.props.location.state.account,
                starId: this.props.location.state.account
            }
        })
    }

    handleDateChange(date) {
        // console.log(date);
        this.setState({
            nextVisitDate: date
        })
    }

    doSetReminder() {
        console.log(this.props.location);
        let req = {
            next_visit_date: moment(this.state.nextVisitDate).format("YYYY-MM-DD h:mm:s"),
            joint_meeting: "no",
            cc_account: "no",
            visit_flag: "no",
            capture_flag: "no",
            checkSchedule: 0,
            submit: 1
        }
        if(this.props.location.state.account.length === undefined) {
            req.accountIdList = this.props.location.state.account.account_id.toString();
        }
        else if(this.props.location.state.account.length > 0) {
            let getIdList = this.props.location.state.account.map(el => {
                return el.id.toString()
            })
            req.accountIdList = getIdList.join(",");
        }
        console.log(req);
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.post(ENDPOINTS.next_visit, req, axiosConfig)
            .then((res) => {
                console.log(res);
                if(res.data.status && res.data.status === "1") {
                    this.setState({
                        updateSuccess: true,
                        updateFailure: false
                    })
                }
                else {
                    this.setState({
                        updateSuccess: false,
                        updateFailure: true
                    })
                }
            })
    }

    closePopup() {
        this.setState({
            updateSuccess: false,
            updateFailure: false
        })
        this.props.history.push({
            pathname: '/accounts',
            state: { }
        })
    }

    render() {
        return (
            <div>

                {this.state.updateSuccess === true && <div className="popup_wrap">
                    <div className="popup_overlay"></div>
                    <div className="notif_content">
                        <p className="notif_success">Reminder set successfully</p>
                        <button className="notif_ok_btn" onClick={this.closePopup.bind(this)}>OK</button>
                    </div>
                </div>}

                {this.state.updateFailure === true && <div className="popup_wrap">
                    <div className="popup_overlay"></div>
                    <div className="notif_content">
                        <p className="notif_failure">Reminder set failed</p>
                        <button className="notif_ok_btn" onClick={this.closePopup.bind(this)}>OK</button>
                    </div>
                </div>}

                <Header />

                <div className="main_body">

                    <Sidebar />

                    <div className="content_area update_visit_content">
                        <div className="update_visit_wrapper">
                            <div className="update_visit_left">
                                <ol className="breadcrumb">
                                    <li><a href="javascript:void(0);" onClick={this.redirectToupdateMeeting.bind(this)}>Update Meeting</a></li>
                                    <li className="active"><a href="javascript:void(0);">Set Reminder</a></li>
                                    {/*<li><a href="javascript:void(0);" onClick={this.redirectToTodo.bind(this)}>Todos</a></li>*/}
                                </ol> {/* breadcrumb */}
                                <div className="row">
                                    <div className="col-md-12">
                                        {this.props.location.state.account.length === undefined && <div className="update_group mb-30px">
                                            <h3 className="update_group_title">Selected Account</h3>
                                            <div className="choosed_wrap">
                                                <div className="choosed_box">
                                                    <span>{this.props.location.state.account.name}</span>
                                                </div>
                                            </div>
                                        </div>}
                                        {this.props.location.state.account.length >= 0 && <div className="update_group mb-30px">
                                            <h3 className="update_group_title">Selected Account</h3>
                                            <div className="choosed_wrap">
                                                {this.props.location.state.account.map((elem, index) => (
                                                    <div className="choosed_box" key={index}>
                                                        <span>{elem.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>}
                                        <div className="update_group mb-30px">
                                            <h3 className="update_group_title">Select Date and Time</h3>
                                            <DatePicker
                                                minDate={moment().add(1, 'days')}
                                                inline
                                                timeIntervals={5}
                                                dateFormat="LT"
                                                showTimeSelect
                                                selected={this.state.nextVisitDate}
                                                onChange={this.handleDateChange.bind(this)} />
                                        </div>
                                        <div className="update_group">
                                            <button type="button" className="site_btn" onClick={this.doSetReminder.bind(this)}>Set Reminder</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(Reminder);
