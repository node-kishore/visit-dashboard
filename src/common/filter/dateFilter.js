import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

let startDate = moment();
let endDate = moment(new Date()).add(1,'days');
let monthNumberSelected = 6;

class DateFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fromChild: '',
            startDate: moment().startOf('month'),
            endDate: moment(new Date()),
            monthSelected: 6
        };
    }

    handleData(data) {
        this.setState({
            fromChild: data
        });
    }

    handleChangeStart(date) {
        // console.log(this.props);
        // console.log(moment(this.state.endDate).diff(moment(date), 'days'))
        if(this.props.dateRange === "7 Days") {
            if(moment(date).isAfter(moment(this.state.endDate))) {
                this.setState({
                    startDate: moment(this.state.endDate).add(-1,'days'),
                });
                startDate = this.state.endDate;
                endDate = moment(this.state.endDate).add(1,'days');
                let toTransferDate = {
                    startDate: startDate,
                    endDate: endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
            else if(moment(this.state.endDate).diff(moment(date), 'days') > 6) {
                this.setState({
                    startDate: moment(this.state.endDate).add(-6,'days'),
                });
                startDate = moment(this.state.endDate).add(-6,'days');
                endDate = moment(this.state.endDate);
                let toTransferDate = {
                    startDate: startDate,
                    endDate: endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
            else {
                this.setState({
                    startDate: date
                });
                startDate = date;
                let toTransferDate = {
                    startDate: date,
                    endDate: this.state.endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
        }
        if(this.props.dateRange === "10 Days") {
            if(moment(date).isAfter(moment(this.state.endDate))) {
                this.setState({
                    startDate: moment(this.state.endDate).add(-1,'days'),
                });
                startDate = this.state.endDate;
                endDate = moment(this.state.endDate).add(1,'days');
                let toTransferDate = {
                    startDate: startDate,
                    endDate: endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
            else if(moment(this.state.endDate).diff(moment(date), 'days') > 9) {
                // console.log(moment(this.state.endDate).add(-9,'days').format("DD-MM-YYYY"));
                startDate = moment(this.state.endDate).add(-9,'days');
                endDate = moment(this.state.endDate);
                let toTransferDate = {
                    startDate: startDate,
                    endDate: endDate
                }
                this.props.onUpdateDate(toTransferDate);
                setTimeout(() => {
                    this.setState({
                        startDate: moment(this.state.endDate).add(-9,'days')
                    });
                })
            }
            else {
                this.setState({
                    startDate: date
                });
                startDate = date;
                let toTransferDate = {
                    startDate: date,
                    endDate: this.state.endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
        }
        if(this.props.dateRange === "Next 7 Days") {
            if(moment(date).isAfter(moment(this.state.endDate))) {
                this.setState({
                    startDate: moment(this.state.endDate).add(6,'days'),
                });
                startDate = this.state.endDate;
                endDate = moment(this.state.endDate).add(6,'days');
                let toTransferDate = {
                    startDate: startDate,
                    endDate: endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
            else if(moment(this.state.endDate).diff(moment(date), 'days') > 6) {
                this.setState({
                    startDate: moment(this.state.endDate).add(-6,'days'),
                });
                startDate = moment(this.state.endDate).add(-6,'days');
                endDate = moment(this.state.endDate);
                let toTransferDate = {
                    startDate: startDate,
                    endDate: endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
            else {
                this.setState({
                    startDate: date
                });
                startDate = date;
                let toTransferDate = {
                    startDate: date,
                    endDate: this.state.endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
        }
        else {
            if(moment(date).isAfter(moment(this.state.endDate))) {
                this.setState({
                    startDate: moment(this.state.endDate).add(-1,'days'),
                });
                startDate = this.state.endDate;
                endDate = moment(this.state.endDate).add(1,'days');
                let toTransferDate = {
                    startDate: startDate,
                    endDate: endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
            else {
                this.setState({
                    startDate: date
                });
                startDate = date;
                let toTransferDate = {
                    startDate: this.state.startDate,
                    startDate: date
                }
                this.props.onUpdateDate(toTransferDate);
            }
        }
    }

    handleChangeEnd(date) {
        console.log(this.props.dateRange);
        if(this.props.dateRange === "7 Days") {
            if(moment(date).isBefore(moment(this.state.endDate))) {
                this.setState({
                    endDate: moment(this.state.startDate).add(1,'days')
                });
                startDate = moment(this.state.startDate).add(-1,'days');
                endDate = this.state.startDate;
                let toTransferDate = {
                    startDate: startDate,
                    endDate: endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
            else if(moment(date).diff(moment(this.state.startDate), 'days') > 6) {
                this.setState({
                    endDate: moment(this.state.startDate).add(6,'days')
                });
                startDate = moment(this.state.startDate);
                endDate = moment(this.state.startDate).add(6,'days');
                let toTransferDate = {
                    startDate: startDate,
                    endDate: endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
            else {
                this.setState({
                    endDate: date
                });
                endDate = date;
                let toTransferDate = {
                    endDate: date,
                    startDate: this.state.startDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
        }
        if(this.props.dateRange === "10 Days") {
            if(moment(date).isBefore(moment(this.state.startDate))) {
                this.setState({
                    endDate: moment(this.state.startDate).add(1,'days')
                });
                startDate = moment(this.state.startDate).add(-1,'days');
                endDate = this.state.startDate;
                let toTransferDate = {
                    startDate: startDate,
                    endDate: endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
            else if(moment(date).diff(moment(this.state.startDate), 'days') > 9) {
                startDate = moment(this.state.startDate);
                endDate = moment(this.state.startDate).add(9,'days');
                let toTransferDate = {
                    startDate: startDate,
                    endDate: endDate
                }
                this.props.onUpdateDate(toTransferDate);
                setTimeout(() => {
                    this.setState({
                        endDate: moment(this.state.startDate).add(9,'days')
                    });
                })
            }
            else {
                this.setState({
                    endDate: date
                });
                endDate = date;
                let toTransferDate = {
                    endDate: date,
                    startDate: this.state.startDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
        }
        else {
            if(moment(date).isBefore(moment(this.state.endDate))) {
                this.setState({
                    endDate: moment(this.state.startDate).add(1,'days')
                });
                startDate = moment(this.state.startDate).add(-1,'days');
                endDate = this.state.startDate;
                let toTransferDate = {
                    startDate: startDate,
                    endDate: endDate
                }
                this.props.onUpdateDate(toTransferDate);
            }
            else {
                this.setState({
                    endDate: date
                });
                endDate = date;
                let toTransferDate = {
                    startDate: this.state.startDate,
                    endDate: date
                }
                this.props.onUpdateDate(toTransferDate);
            }
        }
    }

    updateState(val){
        // console.log(val);
        if(val === "Today") {
            this.setState({
                startDate: moment(new Date()),
                endDate: moment(new Date())
            })
            startDate = moment(new Date());
            endDate = moment(new Date());
            let toTransferDate = {
                startDate: startDate,
                endDate: endDate
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === "Yesterday") {
            this.setState({
                startDate: moment(new Date()).add(-1,'days'),
                endDate: moment(new Date()).add(-1,'days')
            })
            startDate = moment(new Date()).add(-1,'days');
            endDate = moment(new Date()).add(-1,'days');
            let toTransferDate = {
                startDate: startDate,
                endDate: endDate
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === "Last 7 Days") {
            this.setState({
                startDate: moment(new Date()).add(-6,'days'),
                endDate: moment(new Date())
            })
            startDate = moment(new Date()).add(-6,'days');
            endDate = moment(new Date());
            let toTransferDate = {
                startDate: startDate,
                endDate: endDate
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === "Last 30 Days") {
            this.setState({
                startDate: moment(new Date()).add(-29,'days'),
                endDate: moment(new Date())
            })
            startDate = moment(new Date()).add(-29,'days');
            endDate = moment(new Date());
            let toTransferDate = {
                startDate: startDate,
                endDate: endDate
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === "MTD") {
            this.setState({
                startDate: moment().startOf('month'),
                endDate: moment(new Date())
            })
            startDate = moment().startOf('month');
            endDate = moment(new Date());
            let toTransferDate = {
                startDate: startDate,
                endDate: endDate
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === "Last Month") {
            this.setState({
                startDate: moment(new Date()).add(-1,'months').startOf('month'),
                endDate: moment(new Date()).add(-1,'months').endOf('month')
            })
            startDate = moment(new Date()).add(-1,'months').startOf('month');
            endDate = moment(new Date()).add(-1,'months').endOf('month');
            let toTransferDate = {
                startDate: startDate,
                endDate: endDate
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === 1) {
            monthNumberSelected = val;
            this.setState({
                monthSelected: val
            })
            let toTransferDate = {
                monthSelected: val
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === 2) {
            monthNumberSelected = val;
            this.setState({
                monthSelected: val
            })
            let toTransferDate = {
                monthSelected: val
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === 3) {
            monthNumberSelected = val;
            this.setState({
                monthSelected: val
            })
            let toTransferDate = {
                monthSelected: val
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === 4) {
            monthNumberSelected = val;
            this.setState({
                monthSelected: val
            })
            let toTransferDate = {
                monthSelected: val
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === 5) {
            monthNumberSelected = val;
            this.setState({
                monthSelected: val
            })
            let toTransferDate = {
                monthSelected: val
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === 6) {
            monthNumberSelected = val;
            this.setState({
                monthSelected: val
            })
            let toTransferDate = {
                monthSelected: val
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === 9) {
            monthNumberSelected = val;
            this.setState({
                monthSelected: val
            })
            let toTransferDate = {
                monthSelected: val
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(val === 12) {
            monthNumberSelected = val;
            this.setState({
                monthSelected: val
            })
            let toTransferDate = {
                monthSelected: val
            }
            this.props.onUpdateDate(toTransferDate);
        }
    }

    componentDidMount() {
        // console.log(this.props);
        let toTransferDate = {
            monthSelected: 6
        }
        this.props.onUpdateDate(toTransferDate);
        if(this.props.dateRange === "7 Days") {
            this.setState({
                startDate: moment(new Date()).add(-6, 'days'),
                endDate: moment(new Date())
            })
            startDate = moment(new Date()).add(-6, 'days');
            endDate = moment(new Date());
            let toTransferDate = {
                startDate: startDate,
                endDate: endDate
            }
            this.props.onUpdateDate(toTransferDate);
        }
        if(this.props.dateRange === "Next 7 Days") {
            this.setState({
                startDate: moment(new Date()),
                endDate: moment(new Date()).add(6, 'days')
            })
            startDate = moment(new Date());
            endDate = moment(new Date()).add(6, 'days');
            let toTransferDate = {
                startDate: startDate,
                endDate: endDate
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(this.props.dateRange === "6 Months") {
            this.setState({
                startDate: moment(new Date()).add(-5, 'months'),
                endDate: moment(new Date())
            })
            startDate = moment(new Date()).add(-5, 'months');
            endDate = moment(new Date());
            let toTransferDate = {
                startDate: startDate,
                endDate: endDate
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else if(this.props.dateRange === "10 Days") {
            this.setState({
                startDate: moment(new Date()).add(-9, 'days'),
                endDate: moment(new Date())
            })
            startDate = moment(new Date()).add(-9, 'days');
            endDate = moment(new Date());
            let toTransferDate = {
                startDate: startDate,
                endDate: endDate
            }
            this.props.onUpdateDate(toTransferDate);
        }
        else {
            let toTransferDate = {
                startDate: startDate,
                endDate: endDate
            }
            this.props.onUpdateDate(toTransferDate);
        }
    }

    componentWillUnmount() {
        this.setState({
            fromChild: "",
            startDate: "",
            endDate: "",
            monthSelected: ""
        })
    }

    render() {
        return (
            <div className="filter_lists">
                <h3 className="filter_title">Filter by Date</h3>
                <ul>
                    {/* onlyMonthsFilter={this.props.onlyMonthsFilter} */}
                    <li className={(this.props.onlyMonthsFilter !== "true" ? "hidden" : "")}>
                        <button className={"filter_btn" + (this.state.monthSelected === 6 ? " active" : "")} onClick={() => this.updateState(6)}>6 Months</button>
                    </li>
                    <li className={(this.props.onlyMonthsFilter !== "true" ? "hidden" : "")}>
                        <button className={"filter_btn" + (this.state.monthSelected === 9 ? " active" : "")} onClick={() => this.updateState(9)}>9 Months</button>
                    </li>
                    <li className={(this.props.onlyMonthsFilter !== "true" ? "hidden" : "")}>
                        <button className={"filter_btn" + (this.state.monthSelected === 12 ? " active" : "")} onClick={() => this.updateState(12)}>12 Months</button>
                    </li>


                    <li className={(this.props.onlyCustomDate === true || this.props.onlyMonthsFilter === "true" ? "hidden" : "")}>
                        <button className="filter_btn" onClick={() => this.updateState("Today")}>Today</button>
                    </li>
                    <li className={(this.props.onlyCustomDate === true || this.props.onlyMonthsFilter === "true" ? "hidden" : "")}>
                        <button className="filter_btn" onClick={() => this.updateState("Yesterday")}>Yesterday</button>
                    </li>
                    <li className={(this.props.onlyCustomDate === true || this.props.onlyMonthsFilter === "true" ? "hidden" : "")}>
                        <button className="filter_btn" onClick={() => this.updateState("Last 7 Days")}>Last 7 Days</button>
                    </li>
                    <li className={(this.props.onlyCustomDate === true || this.props.onlyMonthsFilter === "true" ? "hidden" : "")}>
                        <button className="filter_btn" onClick={() => this.updateState("Last 30 Days")}>Last 30 Days</button>
                    </li>
                    <li className={(this.props.onlyCustomDate === true || this.props.onlyMonthsFilter === "true" ? "hidden" : "")}>
                        <button className="filter_btn" onClick={() => this.updateState("MTD")}>MTD</button>
                    </li>
                    <li className={(this.props.onlyCustomDate === true || this.props.onlyMonthsFilter === "true" ? "hidden" : "")}>
                        <button className="filter_btn" onClick={() => this.updateState("Last Month")}>Last Month</button>
                    </li>
                    <li className={"filter_col" + (this.props.onlyMonthsFilter === "true" ? " hidden" : "")}>
                        <h3>Custom Date</h3>
                        <div className="custom_filter_row">
                            <div className="custom_filter_col">
                                <label>From Date</label>
                                {this.props.disablePreviousDates == true && <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={this.state.startDate}
                                    selectsStart
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onChange={this.handleChangeStart.bind(this)}
                                    minDate={moment()} />}
                                {this.props.disablePreviousDates != true && <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={this.state.startDate}
                                    selectsStart
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onChange={this.handleChangeStart.bind(this)} />}
                            </div>
                            <div className="custom_filter_col">
                                <label>To Date</label>
                                {this.props.disablePreviousDates == true && <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={this.state.endDate}
                                    selectsEnd
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onChange={this.handleChangeEnd.bind(this)}
                                    minDate={moment()} />}
                                {this.props.disablePreviousDates != true && <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={this.state.endDate}
                                    selectsEnd
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onChange={this.handleChangeEnd.bind(this)} />}
                            </div>
                            {/*<DatePickerComponent handlerFromParant={this.handleData} toDate={this.state.toDate} />*/}
                        </div>
                        <p className={"max_info" + (this.props.dateRange === "10 Days" ? "" : " hidden")}>Note: Max 10 Days</p>
                        <p className={"max_info" + (this.props.dateRange === "6 Months" ? "" : " hidden")}>Note: Max 6 Months</p>
                        <p className={"max_info" + (this.props.dateRange === "7 Days" ? "" : " hidden")}>Note: Max 7 Days</p>
                    </li>
                </ul>
            </div>
        )
    }
}

export default DateFilter;
