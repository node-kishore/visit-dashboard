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
            meetingRemarks: "",
            nextVisitDate: moment().add(1, 'days'),
            captureFields: [],
            updateSuccess: false,
            updateFailure: false,
            hasNextVisitChoosed: false,
            visitUpdating: false
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
            this.geoFindMe();
        }
        console.log(this.props.location);
    }

    geoFindMe() {
        let _this = this;
        if (!navigator.geolocation){
            alert("Geolocation is not supported by your browser");
            return;
        }
        function success(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;
            if(_this._isMounted === true) {
                _this.setState({
                    latitude: latitude,
                    longitude: longitude
                })
            }
            // console.log(_this.state);
            // output.style.display = "none";
        }
        function error() {
            // output.style.display = "none";
            if(_this._isMounted === true) {
                _this.setState({
                    latitude: null,
                    longitude: null
                })
            }
        }
        // output.style.display = "flex";
        // setTimeout(() => {
            // output.style.backgroundColor = "rgba(0,0,0,0.8)";
        // })
        navigator.geolocation.getCurrentPosition(success, error);
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
        console.log(moment(date));
        this.setState({
            nextVisitDate: moment(date),
            hasNextVisitChoosed: true
        })
    }

    toggleAccordion(item) {
        let allItems = this.state.captureFields;
        let filterAllItems = allItems.filter(elem => {
            return elem.groupTitle === item.groupTitle
        });
        filterAllItems[0].accordionOpened = !filterAllItems[0].accordionOpened;
        this.setState({
            captureFields: allItems
        })
        // console.log(item);
        // console.log(allItems);
    }

    updateNoteVisitType(e, type, item) {
        if(type === "visit_type") {
            let account_type = this.state.visitType.map(function(el) {
                var o = Object.assign({}, el);
                // console.log(el.id + "===" + account.id);
                if(el.id === item.id) {
                    o.checked = e.target.checked;
                }
                return o;
            })
            this.setState({
                visitType: account_type,
                gr1_valid: false
            })
        }
        if(type === "note_type") {
            let account_type = this.state.noteType.map(function(el) {
                var o = Object.assign({}, el);
                // console.log(el.id + "===" + account.id);
                if(el.id === item.id) {
                    o.checked = e.target.checked;
                }
                return o;
            })
            this.setState({
                noteType: account_type,
                gr2_valid: false
            })
        }
    }

    checkValidation() {
        let isError = false;

        let visitTypeCount = this.state.visitType.filter((elem) => {
            return elem.checked === true
        })
        let noteTypeCount = this.state.noteType.filter((elem) => {
            return elem.checked === true
        })

        console.log(this.state.noteType);

        if(visitTypeCount.length <= 0) {
            this.setState({
                gr1_valid: true
            })
            isError = true;
        }
        else {
            this.setState({
                gr1_valid: false
            })
            isError = false;
        }
        if(noteTypeCount.length <= 0) {
            this.setState({
                gr2_valid: true
            })
            isError = true;
        }
        else {
            this.setState({
                gr2_valid: false
            })
            isError = false;
        }
        if(this.state.meetingRemarks == "") {
            this.setState({
                meetingRemarks_valid: true
            })
            isError = true;
        }
        else {
            this.setState({
                meetingRemarks_valid: false
            })
            isError = false;
        }
        if(JSON.parse(localStorage.getItem("visitData")).nextVisitDate_skp_btn_visibility === "no") {
            if(this.state.hasNextVisitChoosed === false) {
                this.setState({
                    next_visit_error: true
                })
                isError = true;
            }
            else {
                this.setState({
                    next_visit_error: false
                })
                isError = false;
            }
        }

        let modifiedCaptureForm = [];

        for(let captureField of this.state.captureFields) {
            captureField.accordionOpened = true;
            modifiedCaptureForm.push(captureField);
            for(let field of captureField.fields) {
                if(field.is_mandatory === 'y') {
                    if(this.state[field.field_name] === "") {
                        this.setState({
                            [field.field_name + "_error"]: true
                        })
                        isError = true
                    }
                    else {
                        this.setState({
                            [field.field_name + "_error"]: false
                        })
                        isError = false
                    }
                }
            }
        }

        this.setState({
            captureFields: modifiedCaptureForm
        })

        return isError;
    }

    doUpdateVisit(accountIdList, starTypeId, starTypeDict) {
        let captureNotValid = this.checkValidation();
        let visitTypeIds = this.state.visitType.filter(elem => {
            return elem.checked && elem.checked === true
        }).map(elem => {
            return elem.id
        })
        let noteTypeIds = this.state.noteType.filter(elem => {
            return elem.checked && elem.checked === true
        }).map(elem => {
            return elem.id
        })
        let req = {
            VisitTypeId: visitTypeIds.join(","),
            NoteTypeId: noteTypeIds.join(","),
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
        if(captureNotValid === false) {
            this.setState({
                visitUpdating: true
            })
            axios.post(ENDPOINTS.update_visit, req, axiosConfig)
                .then((res) => {
                    // console.log(res);
                    this.setState({
                        visitUpdating: true
                    })
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

    redirectToReminder() {
        this.props.history.push({
            pathname: '/set-reminder',
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
                        <form>
                        <div className="update_visit_wrapper">
                            <div className="update_visit_left">
                                <ol className="breadcrumb">
                                    <li className="active"><a href="javascript:void(0);">Update Meeting</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.redirectToReminder.bind(this)}>Set Reminder</a></li>
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
                                            <h3 className="update_group_title">Select Visit Type</h3>
                                            <div className="row update_group_controls">
                                                {this.state.visitType.map((item, index) => (
                                                    <div key={index} className="col-md-4 mb-10px choose_col choose_col_3">
                                                        <input
                                                            value={item.id}
                                                            type="checkbox"
                                                            id={"vt_" + index}
                                                            name="gr1"
                                                            onChange={(e) => this.updateNoteVisitType(e, 'visit_type', item)} />
                                                        <label className="choose_label" htmlFor={"vt_" + index} title={item.type}>{item.type}</label>
                                                    </div>
                                                ))}
                                            </div>
                                            {this.state.gr1_valid === true && <div className="field_error">Choose atleast one visit type</div>}
                                        </div> {/*update_group*/}
                                        <div className="update_group mb-30px">
                                            <h3 className="update_group_title">Select Note Type</h3>
                                            <div className="row update_group_controls">
                                                {this.state.noteType.map((item, index) => (
                                                    <div key={index} className="col-md-3 choose_col choose_col_4 mb-10px">
                                                        <input
                                                            value={item.id}
                                                            type="checkbox"
                                                            id={"nt_" + index}
                                                            name="gr2"
                                                            onChange={(e) => this.updateNoteVisitType(e, 'note_type', item)} />
                                                        <label className="choose_label" htmlFor={"nt_" + index} title={item.type}>{item.type}</label>
                                                    </div>
                                                ))}
                                            </div>
                                            {this.state.gr2_valid === true && <div className="field_error">Choose atleast one note type</div>}
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
                                                    {this.state.meetingRemarks_valid === true && this.state.meetingRemarks === "" && <div className="field_error" style={{marginTop: "-22px"}}>Above field is required</div>}
                                                </div>
                                            </div>
                                        </div> {/*update_group*/}
                                        <div className="update_group mb-30px">
                                            <div className="row update_group_controls">
                                                <div className="col-md-12 attend_meeting_check">
                                                    <input
                                                        onChange={this.handleChange.bind(this)}
                                                        name="attend_meeting"
                                                        type="checkbox"
                                                        id="attend_meeting" />
                                                    <label htmlFor="attend_meeting">&nbsp;&nbsp;Attended The Meeting Along With Manager</label>
                                                </div>
                                            </div>
                                        </div> {/*update_group*/}
                                        <div className="update_group">
                                            <div className="text-center">
                                                <button
                                                    type="button"
                                                    onClick={this.doUpdateVisit.bind(this)}
                                                    className="update_meeting_btn"
                                                    disabled={this.state.visitUpdating === true ? true : false}>{this.state.visitUpdating === true ? "Updating..." : "Update Meeting"}</button>
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
                                        timeIntervals={5}
                                        dateFormat="LT"
                                        showTimeSelect
                                        selected={this.state.nextVisitDate}
                                        onChange={this.handleDateChange.bind(this)} />
                                    {this.state.next_visit_error === true && this.state.hasNextVisitChoosed === false && <div className="field_error">Choose a Date and Time</div>}
                                </div>
                                {JSON.parse(localStorage.getItem('visitData')).captureForm_screen_visibility === "yes" && <div className="capture_form_wrap">
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
                                                            <label>{formItem.display_name}{formItem.is_mandatory === 'y' && <span>*</span>}</label>
                                                            {formItem.field_type != "dropdown" && <input
                                                                type={formItem.field_type === "numeric" ? "number" : "text"}
                                                                value={this.state[formItem.field_name]}
                                                                onChange={this.handleChange}
                                                                name={"" + (formItem.field_name)}
                                                                 />}
                                                            {formItem.field_type === "dropdown" && <select
                                                                                                        onChange={this.handleChange}
                                                                                                        value={this.state[formItem.field_name]}
                                                                                                        name={"" + (formItem.field_name)}>
                                                                <option value="">Choose</option>
                                                                {formItem.option_list.map((optionItem, optionIndex) => (
                                                                    <option key={optionIndex} value={optionItem}>{optionItem}</option>
                                                                ))}
                                                            </select>}
                                                            {formItem.is_mandatory === 'y' && this.state[formItem.field_name+'_error'] === true && this.state[formItem.field_name] === "" && <div className="field_error">Above field is mandatory</div>}
                                                        </div>
                                                    ))}
                                                </div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>}
                            </div> {/* update_visit_left */}
                        </div> {/* update_visit_wrapper */}
                        </form>
                    </div> {/* content_area */}

                </div>
            </div>
        );
    }
}

export default UpdateVisits;
