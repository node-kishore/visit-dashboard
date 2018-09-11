import React, { Component } from 'react';
import Header from '../../common/header';
import Sidebar from '../../common/sidebar';
import AccountTouchBase from './components/accountTouchBase';
import MonthlyVisit from './components/monthlyVisit';
import MyDataTeamData from './components/mydataTeamdata';
import DailyVisit from './components/dailyVisit';
import VisitType from './components/visitTypeContribution';
import NoteType from './components/noteTypeContribution';
import VisitMap from './components/visitsMap';

function geoFindMe() {
    var output = document.getElementById("allow_location");
    if (!navigator.geolocation){
        alert("Geolocation is not supported by your browser");
        return;
    }
    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        output.style.display = "none";
    }
    function error() {
        output.style.display = "none";
    }
    output.style.display = "flex";
    setTimeout(() => {
        output.style.backgroundColor = "rgba(0,0,0,0.8)";
    })
    navigator.geolocation.getCurrentPosition(success, error);
}

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterOpened: false,
            trendsData: {},
            visitTypeContributionData: {},
            noteTypeData: {},
            userwisecountData: {},
            accountTouchBaseData: {},
            mapMarkers: {},
            filterType: "Last 30 Days"
        }
    }

    toggleFilter() {
        this.setState({ filterOpened: !this.state.filterOpened })
    }

    componentDidMount() {
        // this.getCurrentGeoLocation();
        geoFindMe();
    }

    componentWillUnmount() {
        // this.setState({
        //     filterOpened: false,
        //     trendsData: {},
        //     visitTypeContributionData: {},
        //     noteTypeData: {},
        //     userwisecountData: {},
        //     accountTouchBaseData: {},
        //     mapMarkers: {},
        //     filterType: ""
        // })
    }

    render() {
        return (
            <div>

                <Header />

                <div className="main_body">

                    <Sidebar />

                    <div className="content_area">

                        <div className="row">

                            <div className="allow_location" id="allow_location" style={{display: 'none'}}>
                                <h3>Please allow us to fetch your current location</h3>
                            </div>

                            <MyDataTeamData />

                            <MonthlyVisit />

                            <DailyVisit />

                            <VisitType />

                            <NoteType />

                            <AccountTouchBase />

                            <VisitMap />

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Dashboard;
