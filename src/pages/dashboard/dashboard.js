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

    componentDidMount() { }

    componentWillUnmount() {
        this.setState({
            filterOpened: false,
            trendsData: {},
            visitTypeContributionData: {},
            noteTypeData: {},
            userwisecountData: {},
            accountTouchBaseData: {},
            mapMarkers: {},
            filterType: ""
        })
    }

    render() {
        return (
            <div>

                <Header />

                <div className="main_body">

                    <Sidebar />

                    <div className="content_area">

                        <div className="row">

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
