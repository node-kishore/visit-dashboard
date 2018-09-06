import React, { Component } from 'react';
import moment from 'moment';
import { findDOMNode } from 'react-dom';
import 'react-datepicker/dist/react-datepicker.css';
import UserFilter from './userFilter';
import DateFilter from './dateFilter';
import $ from 'jquery';

let selectedUsers = [];
let startDate = moment();
let endDate = moment(new Date()).add(1,'days');
let monthNumberSelected = 6;

let allUsers = [];

function FilterWrap(props) {
    // console.log(props);
    if (props.filterByUser === "false" && props.filterByDate === "true") {
        return <DateFilter
                    onlyMonthsFilter={props.onlyMonthsFilter}
                    dateRange={props.dateRange}
                    onlyCustomDate={props.onlyCustomDate}
                    onUpdateDate={(e) => props.updateDate(e)}
                    disablePreviousDates={props.disablePreviousDates} />;
    }
    else if (props.filterByUser === "true" && props.filterByDate === "false") {
        return <UserFilter
                    dateRange={props.dateRange}
                    users={props.users}
                    filterId={props.filterId}
                    onUpdateUser={(e) => props.onUpdateUser(e)} />;
    }
    else {
        return (
            <div className="filter_wrap">
                <UserFilter
                    dateRange={props.dateRange}
                    users={props.users}
                    filterId={props.filterId}
                    onUpdateUser={(e) => props.onUpdateUser(e)} />
                <DateFilter
                    onlyMonthsFilter={props.onlyMonthsFilter}
                    dateRange={props.dateRange}
                    onlyCustomDate={props.onlyCustomDate}
                    onUpdateDate={(e) => props.updateDate(e)}
                    disablePreviousDates={props.disablePreviousDates} />
            </div>
        )
    }
}

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showFilter: false,
            startDate: "",
            endDate: "",
            noMonthSelected: "",
            userId: ""
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();
        if (this._isMounted) {
            this.setState({ showFilter: this.state.showFilter === false ? true : false });
        }
    }

    closeMenu(event) {
        // if (!this.dropdownMenu.contains(event.target)) {
        if (this._isMounted) {
            this.setState({ showFilter: false });
        }
        // }
    }

    applyFilter() {
        let idMap = this.state.users.reduce(function merge(map, node) {
          map[node.id] = node;

          if (Array.isArray(node.users)) {
            node.users.reduce(merge, map);
          }

          return map;
        }, {});
        let matches = [];
        let keys = Object.keys(idMap);
        for(let i = 0; i < keys.length; i++) {
            if(idMap[keys[i]].checked === true) {
                matches.push({id: idMap[keys[i]].id});
            }
        }
        let data = {
            selectedUsers: matches,
            startDate: moment(this.state.startDate).format(this.props.dateFormat && this.props.dateFormat === "without_time" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss"),
            endDate: moment(this.state.endDate).format(this.props.dateFormat && this.props.dateFormat === "without_time" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss"),
            monthNumberSelected: this.state.noMonthSelected
        }
        this.props.onfilterApply(data);
        this.closeMenu();
    }

    cancelFilter() {
        if (this._isMounted) {
            this.setState({ showFilter: false });
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({
            userId: JSON.parse(localStorage.getItem('userData')).user_id
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateUser(e) {
        // console.log(e);
        if (this._isMounted) {
            this.setState({
                users: e
            })
        }
    }

    updateDate(e) {
        // console.log(this._isMounted);
        if(this._isMounted) {
            // console.log(e);
            if(e.monthSelected !== undefined) {
                this.setState({
                    noMonthSelected: e.monthSelected
                })
            }
            if(e.startDate !== undefined) {
                this.setState({
                    startDate: e.startDate
                })
            }
            if(e.endDate !== undefined) {
                this.setState({
                    endDate: e.endDate
                })
            }
        }
    }

    render() {
        return (
            <div className="filter_wrapper">
                <button
                    className="btn btn-default dropdown-toggle common_filter_btn"
                    type="button"
                    id="dropdownMenu1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={this.showMenu}>
                    Filter
                    <span className="caret" style={{marginLeft: "5px"}}></span>
                </button>
                {this.state.showFilter ? (<div
                    ref={(element) => {
                        this.dropdownMenu = element;
                    }} className={"dropdown-menu common_dropdown_menu" + (this.props.filterByUser === "false" || this.props.filterByDate === "false" ? " one_col" : "")}>
                    <div className="filter_apply text-right">
                        <button type="button" className="cancel_filter" onClick={this.cancelFilter.bind(this)}>Cancel</button>
                        <button type="button" className="apply_filter" onClick={this.applyFilter.bind(this)}>Apply</button>
                    </div>
                    <div className="filter_wrap">
                        <FilterWrap
                            onlyCustomDate={this.props.onlyCustomDate}
                            filterId={this.props.filterId}
                            filterByUser={this.props.filterByUser}
                            filterByDate={this.props.filterByDate}
                            users={this.state.users}
                            dateRange={this.props.dateRange}
                            onlyMonthsFilter={this.props.onlyMonthsFilter}
                            onUpdateUser={(e) => this.updateUser(e)}
                            updateDate={(e) => this.updateDate(e)}
                            disablePreviousDates={this.props.disablePreviousDates} />
                    </div>
                </div>) : ( null )}
            </div>
        )
    }

}

export default Filter;
