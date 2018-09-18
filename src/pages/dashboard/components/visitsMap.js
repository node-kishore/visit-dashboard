import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import moment from 'moment';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import IMAGE from '../../../common/image';
import Filter from '../../../common/filter/common_filter';
import axios from 'axios';
import ENDPOINTS from '../../../common/endpoints';
const dateFormat = "YYYY-MM-DD";

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    // console.log(props.showInfoWindow)
    let markers = props.markers;
    return markers !== undefined && markers.length > 0 && <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 13.0244537, lng: 77.6440287 }}>
        {markers.map((marker, index)=> {
            return (
                <MarkerComponent index={index} key={index} marker={marker} showInfoWindow={props.showInfoWindow} />
            )
        })}
    </GoogleMap>
}))

class MarkerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showInfoWindow: false,
            placeName: ""
        }
    }

    componentWillUnmount() {
        this.setState({
            showInfoWindow: false,
            placeName: ""
        })
    }

    toggleInfoWindow() {
        // console.log(this.props);
        this.setState({
            showInfoWindow: !this.state.showInfoWindow
        })
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBUqG9Mm9UcJ5JWn7Iw85VgzqkuEjYeoyU&latlng=' + this.props.marker.latitude + ',' + this.props.marker.longitude + '&sensor=false')
            .then(res => {
                console.log(res);
                // console.log(res.data.results[0].address_components[2].long_name);
                // this.setState({
                //     placeName: res.data.results[0].address_components[2].long_name
                // })
            })
    }

    render() {
        // console.log(this.props);
        return (
            <Marker
                onClick={this.toggleInfoWindow.bind(this)}
                key={this.props.index}
                title="Click to zoom"
                position={{ lat: parseFloat(this.props.marker.latitude), lng: parseFloat(this.props.marker.longitude) }}>
                {this.state.showInfoWindow === true && (
                    <InfoWindow onCloseClick={this.state.toggleInfoWindow}>
                        <div className="infowindow_wrap">
                            <p><strong>Visit Date: </strong>{this.props.marker.visit_date}</p>
                            <p><strong>Account Name: </strong>{this.props.marker.account_name}</p>
                            <p><strong>User Name: </strong>{this.props.marker.user_name}</p>
                            <p><strong>Visit Type: </strong>{this.props.marker.visit_type}</p>
                            <p><strong>Note Type: </strong>{this.props.marker.note_type}</p>
                            <p><strong>Remark: </strong>{this.props.marker.remark}</p>
                            <p><strong>Localtion: </strong>{this.state.placeName}</p>
                        </div>
                    </InfoWindow>
                )}
            </Marker>
        )
    }
}

class VisitMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showInfoWindow: false,
            filterActive: "MTD",
            filterByUser: [JSON.parse(localStorage.getItem("userData")).user_id],
            loading: false
        }
    }

    componentWillUnmount() {
        this.setState({
            showInfoWindow: false,
            filterActive: "",
            filterByUser: [],
            loading: false
        })
    }

    getMapData(user_id, from_date, to_date) {
        this.setState({
            loading: true
        })
        let req = {
            "from_date": from_date,
            "to_date": to_date,
            "user_ids": user_id
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.post(ENDPOINTS.visit_map, req, axiosConfig)
            .then(res => {
                // console.log(res);
                // console.log()
                if(res.data.status && res.data.status == 401) {
                    this.props.history.push('/');
                }
                else {
                    if(res.data.length <= 0) {
                        let response = [{
                            account_name: "",
                            latitude: null,
                            longitude: null,
                            note_type: "",
                            remark: "",
                            user_name: "",
                            visit_date: "",
                            visit_id: "",
                            visit_type: ""
                        }]
                        this.setState({
                            mapMarkers: response,
                            loading: false
                        })
                    }
                    else {
                        this.setState({
                            mapMarkers: res.data,
                            loading: false
                        })
                    }
                }
            })
    }

    customFilterMap(e) {
        // console.log(e);
        let selectedUser = e.selectedUsers.map((elem) => {
            return elem.id
        })
        this.getMapData(selectedUser, e.startDate, e.endDate);
        this.setState({
			existUser: e.allUsers
		})
    }

    componentDidMount() {
        let user_id = JSON.parse(localStorage.getItem("userData")).user_id;
        let from_date = moment().startOf('month').format(dateFormat);
        let to_date = moment().format(dateFormat);
        this.getMapData([user_id], from_date, to_date);
    }

    showInfo() {
        this.setState({
            showInfoWindow: true
        })
    }

    filterDate(val){
        this.setState({
            filterActive: val
        })
        if(val === "Today") {
            let startDate = moment(new Date()).format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            // let dataType = this.state.myDataActive == true ? 1 : 0;
            this.getMapData(this.state.filterByUser, startDate, endDate);
        }
        else if(val === "Yesterday") {
            let startDate = moment(new Date()).add(-1,'days').format(dateFormat);
            let endDate = moment(new Date()).add(-1,'days').format(dateFormat);
            // let dataType = this.state.myDataActive == true ? 1 : 0;
            this.getMapData(this.state.filterByUser, startDate, endDate);
        }
        else if(val === "Last 7 Days") {
            let startDate = moment(new Date()).add(-6,'days').format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            // let dataType = this.state.myDataActive == true ? 1 : 0;
            this.getMapData(this.state.filterByUser, startDate, endDate);
        }
        else if(val === "Last 30 Days") {
            let startDate = moment(new Date()).add(-29,'days').format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            // let dataType = this.state.myDataActive == true ? 1 : 0;
            this.getMapData(this.state.filterByUser, startDate, endDate);
        }
        else if(val === "MTD") {
            let startDate = moment().startOf('month').format(dateFormat);
            let endDate = moment(new Date()).format(dateFormat);
            // let dataType = this.state.myDataActive == true ? 1 : 0;
            this.getMapData(this.state.filterByUser, startDate, endDate);
        }
        else if(val === "Last Month") {
            let startDate = moment(new Date()).add(-1,'days').startOf('month').format(dateFormat);
            let endDate = moment(new Date()).add(-1,'days').endOf('month').format(dateFormat);
            // let dataType = this.state.myDataActive == true ? 1 : 0;
            this.getMapData(this.state.filterByUser, startDate, endDate);
        }
    }

    render() {
        return(
            <div className="col-md-12">
                <div className="card">
                    <div className="card_header">
                        <div className="title">
                            Visit Location Report
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
                            <Filter
                                existUser={this.state.existUser}
                                onfilterApply={this.customFilterMap.bind(this)}
                                filterByUser="true"
                                filterByDate="true"
                                onlyCustomDate={true}
                                filterBtnLabel="Custom"
                                filterId="map_filter"
                                dateRange="No Range" />
                        </div>
                    </div>
                    <div className="card_body" style={{padding: "15px"}}>
                        {/*<button onClick={this.showInfo.bind(this)}>Click Me</button>*/}
                        <div className="position_relative" style={{height: "400px"}}>
                            <div className={"loader_wrap" + (this.state.loading === true ? "" : " hidden")}><img src={IMAGE.loader} alt="" /></div>
                            <MyMapComponent
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUqG9Mm9UcJ5JWn7Iw85VgzqkuEjYeoyU"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                markers={this.state.mapMarkers}
                                showInfoWindow={this.state.showInfoWindow} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(VisitMap);
