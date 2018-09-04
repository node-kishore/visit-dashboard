import React, { Component } from 'react';
import Header from '../../common/header';
import Sidebar from '../../common/sidebar';

class UpdateVisits extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>

                <Header />

                <div className="main_body">

                    <Sidebar />

                    <div className="content_area update_visit_content">
                        <div className="update_visit_wrapper">
                            <div className="update_visit_left">
                                <ol className="breadcrumb">
                                    <li className="active"><a href="#">Update Meeting</a></li>
                                    <li><a href="#">Set remainder</a></li>
                                    <li><a href="#">To-Do’s</a></li>
                                </ol> {/* breadcrumb */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="update_group mb-30px">
                                            <h3 className="update_group_title">Select Visit Type</h3>
                                            <div className="row update_group_controls">
                                                <div className="col-md-4 choose_col choose_col_3">
                                                    <input type="radio" id="rd1" name="gr1" />
                                                    <label className="choose_label" htmlFor="rd1">One-One Meeting</label>
                                                </div>
                                                <div className="col-md-4 choose_col choose_col_3">
                                                    <input type="radio" id="rd2" name="gr1" />
                                                    <label className="choose_label" htmlFor="rd2">Phone Conversation</label>
                                                </div>
                                                <div className="col-md-4 choose_col choose_col_3">
                                                    <input type="radio" id="rd3" name="gr1" />
                                                    <label className="choose_label" htmlFor="rd3">Group Meeting</label>
                                                </div>
                                            </div>
                                        </div> {/*update_group*/}
                                        <div className="update_group">
                                            <h3 className="update_group_title">Select Note Type</h3>
                                            <div className="row update_group_controls">
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd4" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd4">Funds</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd5" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd5">SIPs</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd6" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd6">Learning &amp; Development</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd7" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd7">Brokerage Or Pricing</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd8" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd8">Fund Manager View</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd9" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd9">NEO Equity</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd10" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd10">Marketing Suport</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd11" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd11">PE STP</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd12" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd12">DEF Game</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd13" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd13">Dil ke Ameer</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd14" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd14">Connect Our Blog</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd15" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd15">Credit Opportunity Funds</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd16" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd16">AIF Equity Hedge Coorporate</label>
                                                </div>
                                                <div className="col-md-3 choose_col choose_col_4 mb-10px">
                                                    <input type="radio" id="rd17" name="gr2" />
                                                    <label className="choose_label" htmlFor="rd17">Fund Manager View Demand</label>
                                                </div>
                                            </div>
                                        </div> {/*update_group*/}
                                    </div> {/* col-md-12 */}
                                </div> {/* row */}
                            </div> {/* update_visit_left */}
                            <div className="update_visit_right">
                                right
                            </div> {/* update_visit_left */}
                        </div> {/* update_visit_wrapper */}
                    </div> {/* content_area */}

                </div>
            </div>
        );
    }
}

export default UpdateVisits;
