import React, { Component } from 'react';
import Header from '../../common/header';
import Sidebar from '../../common/sidebar';
import IMAGE from '../../common/image';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import ENDPOINTS from '../../common/endpoints';

function geoFindMe() {
    var output = document.getElementById("allow_location");
    let _this = this;
    if (!navigator.geolocation){
        alert("Geolocation is not supported by your browser");
        return;
    }
    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        _this.setState({
            latitude: latitude,
            longitude: longitude
        })
        // console.log(_this.state);
        // output.style.display = "none";
    }
    function error() {
        // output.style.display = "none";
        _this.setState({
            latitude: null,
            longitude: null
        })
    }
    // output.style.display = "flex";
    setTimeout(() => {
        output.style.backgroundColor = "rgba(0,0,0,0.8)";
    })
    navigator.geolocation.getCurrentPosition(success, error);
}

class UpdateVisits extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visitType: [],
            noteType: [],
            meetingRemarks: [],
            meetingDate: "",
            captureFields: [],
            updateSuccess: false,
            updateFailure: false
        }
        this.handleChange = this.handleChange.bind(this);
        geoFindMe = geoFindMe.bind(this);
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        let visitData = JSON.parse(localStorage.getItem("visitData"));
        if(this._isMounted === true) {
            this.setState({
                visitType: visitData.visitTypes,
                noteType: visitData.noteTypes
            })
            for(let item of visitData.capture_fields) {
                this.setState({
                    [item.field_name]: ""
                })
            }
            this.generateCaptureForm(visitData.capture_fields);
            geoFindMe();
        }
        console.log(this.props.location);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    generateCaptureForm(items) {
        let allFormGroup = [];
        let captureFormField = [];
        for(let [index, item] of items.entries()) {
            // allFormGroup.push(item.field_group);
            this.setState({
                [item.field_name]: ''
            })
            allFormGroup.indexOf(item.field_group) === -1 ? allFormGroup.push(item.field_group) : null;
        }
        for(let [index, formGroup] of allFormGroup.entries()) {
            let filterByGroup = items.filter(elem => {
                return formGroup === elem.field_group
            })
            let clubElem = {
                groupTitle: formGroup,
                fields: filterByGroup,
                accordionOpened: index === 0 ? true : false
            }
            captureFormField.push(clubElem);
        }
        this.setState({
            captureFields: captureFormField
        })
        // console.log(captureFormField);
    }

    handleChange(e) {
        // console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDateChange(date) {
        this.setState({
            meetingDate: date
        })
    }

    toggleAccordion(item) {
        let allItems = this.state.captureFields;
        let filterAllItems = allItems.filter(elem => {
            return elem.groupTitle === item.groupTitle
        });
        for(let i of allItems) {
            i.accordionOpened = false
        }
        filterAllItems[0].accordionOpened = true;
        this.setState({
            captureFields: allItems
        })
        // console.log(item);
        // console.log(allItems);
    }

    updateNoteVisitType(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    doUpdateVisit(accountIdList, starTypeId, starTypeDict) {
        let req = {
            VisitTypeId: this.state.gr1,
            NoteTypeId: this.state.gr2,
            NoteRemark: this.state.meetingRemarks,
            capture: this.state.attend_meeting === "on" ? "yes" : "no",
            meeting_rating: this.state.meeting_rating,
            sips_count: this.state.sips_count,
            objection: this.state.objection,
            birla_scheme: this.state.birla_scheme,
            commitment_current: this.state.commitment_current,
            commitment_next: this.state.commitment_next,
            scheme1_obj: this.state.scheme1_obj,
            rating_scheme2: this.state.rating_scheme2,
            commitment_current_s2: this.state.commitment_current_s2,
            commitment_next_s2: this.state.commitment_next_s2,
            objection_s2: this.state.objection_s2,
            rating: this.state.rating,
            travel_exp: this.state.travel_exp,
            probability: this.state.probability,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        }
        if(this.props.location.state.starId) {
            req.star_type_id = this.props.location.state.starId[0].id.toString()
        }
        if(this.props.location.state.account.length > 0) {
            let accountIds = this.props.location.state.account.map((elem) => {
                return elem.id.toString()
            })
            req.accountIdList = accountIds.join(",");
        }
        else {
            req.accountIdList = this.props.location.state.account.account_id === undefined ? this.props.location.state.account.id.toString() : this.props.location.state.account.account_id.toString()
        }
        console.log(req);
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.post(ENDPOINTS.update_visit, req, axiosConfig)
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

    activateNextVisitDate() {
        this.setState({
            meetingDate: moment(new Date()).add(1, 'days')
        })
    }

    closePopup() {
        this.setState({
            updateSuccess: false,
            updateFailure: false
        })
    }

    render() {
        return (
            <div>

                <div className="allow_location" id="allow_location" style={{display: 'none'}}>
                    <h3>Please allow us to fetch your current location</h3>
                </div>

                {this.state.updateSuccess === true && <div className="popup_wrap">
                    <div className="popup_overlay"></div>
                    <div className="notif_content">
                        <p className="notif_success">Meeting successfully updated</p>
                        <button className="notif_ok_btn" onClick={this.closePopup.bind(this)}>OK</button>
                    </div>
                </div>}

                {this.state.updateFailure === true && <div className="popup_wrap">
                    <div className="popup_overlay"></div>
                    <div className="notif_content">
                        <p className="notif_failure">Meeting update failed</p>
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
                                    <li className="active"><a href="#">Update Meeting</a></li>
                                    <li><a href="#">Set Reminder</a></li>
                                    <li><a href="#">Todos</a></li>
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
                                            <h3 className="update_group_title">Select Visit Type</h3>
                                            <div className="row update_group_controls">
                                                {this.state.visitType.map((item, index) => (
                                                    <div key={index} className="col-md-4 mb-10px choose_col choose_col_3">
                                                        <input
                                                            value={item.id}
                                                            type="radio"
                                                            id={"vt_" + index}
                                                            name="gr1"
                                                            onChange={this.updateNoteVisitType.bind(this)} />
                                                        <label className="choose_label" htmlFor={"vt_" + index} title={item.type}>{item.type}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div> {/*update_group*/}
                                        <div className="update_group mb-30px">
                                            <h3 className="update_group_title">Select Note Type</h3>
                                            <div className="row update_group_controls">
                                                {this.state.noteType.map((item, index) => (
                                                    <div key={index} className="col-md-3 choose_col choose_col_4 mb-10px">
                                                        <input
                                                            value={item.id}
                                                            type="radio"
                                                            id={"nt_" + index}
                                                            name="gr2"
                                                            onChange={this.updateNoteVisitType.bind(this)} />
                                                        <label className="choose_label" htmlFor={"nt_" + index} title={item.type}>{item.type}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div> {/*update_group*/}
                                        <div className="update_group mb-30px">
                                            <h3 className="update_group_title">Meeting Remarks</h3>
                                            <div className="row update_group_controls">
                                                <div className="col-md-12">
                                                    <textarea
                                                        name="meetingRemarks"
                                                        maxLength="500"
                                                        value={this.state.meetingRemarks}
                                                        onChange={this.handleChange.bind(this)}
                                                        className="meeting_remarks_control">
                                                    </textarea>
                                                    <div className="remarks_info">{this.state.meetingRemarks.length}/500 Words</div>
                                                </div>
                                            </div>
                                        </div> {/*update_group*/}
                                        <div className="update_group mb-30px">
                                            <div className="row update_group_controls">
                                                <div className="col-md-12 attend_meeting_check">
                                                    <input
                                                        onChange={this.updateNoteVisitType.bind(this)}
                                                        name="attend_meeting"
                                                        type="checkbox"
                                                        id="attend_meeting" />
                                                    <label htmlFor="attend_meeting">&nbsp;&nbsp;Attended The Meeting Along With Manager</label>
                                                </div>
                                            </div>
                                        </div> {/*update_group*/}
                                        <div className="update_group">
                                            <div className="text-center">
                                                <button onClick={this.doUpdateVisit.bind(this)} className="update_meeting_btn">Update Meeting</button>
                                            </div>
                                        </div>
                                    </div> {/* col-md-12 */}
                                </div> {/* row */}
                            </div> {/* update_visit_left */}
                            <div className="update_visit_right">
                                <div className="visit_date mb-50px">
                                    <h3 className="update_group_title">Select Next Visit Date</h3>
                                    <DatePicker
                                        minDate={moment().add(1, 'days')}
                                        inline
                                        selected={this.state.nextVisitDate}
                                        onChange={this.handleDateChange.bind(this)} />
                                    {moment(this.state.nextVisitDate).format("DD-MM-YYYY")}
                                </div>
                                <div className="capture_form_wrap">
                                    <h3 className="update_group_title">Select Capture Form</h3>
                                    <div className="accordion_holder">
                                        {this.state.captureFields.map((item, index) => (
                                            <div key={index} className="each_accordion">
                                                <h5 className="group_title" onClick={() => this.toggleAccordion(item)}>
                                                    {item.groupTitle}
                                                    {item.accordionOpened === false && <img src={IMAGE.plus} />}
                                                    {item.accordionOpened === true && <img src={IMAGE.minus} />}
                                                </h5>
                                                {item.accordionOpened == true && <div className="accordion_body">
                                                    {item.fields.map((formItem, formIndex) => (
                                                        <div key={formIndex} className="capture_form_row">
                                                            <label>{formItem.display_name}</label>
                                                            {formItem.field_type != "dropdown" && <input
                                                                type={formItem.field_type === "numeric" ? "number" : "text"}
                                                                value={this.state[formItem.field_name]}
                                                                onChange={this.handleChange}
                                                                name={"" + (formItem.field_name)} />}
                                                            {formItem.field_type === "dropdown" && <select
                                                                                                        onChange={this.handleChange}
                                                                                                        value={this.state[formItem.field_name]}
                                                                                                        name={"" + (formItem.field_name)}>
                                                                <option>Choose</option>
                                                                {formItem.option_list.map((optionItem, optionIndex) => (
                                                                    <option key={optionIndex} value={optionItem}>{optionItem}</option>
                                                                ))}
                                                            </select>}
                                                        </div>
                                                    ))}
                                                </div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div> {/* update_visit_left */}
                        </div> {/* update_visit_wrapper */}
                    </div> {/* content_area */}

                </div>
            </div>
        );
    }
}

export default UpdateVisits;
