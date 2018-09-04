import React, { Component } from 'react';
import Header from '../../common/header';
import Sidebar from '../../common/sidebar';
import Activity from './components/activity';

class Timeline extends Component {

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

                    <div className="content_area">

                        <div className="row">
                            <Activity />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Timeline;
