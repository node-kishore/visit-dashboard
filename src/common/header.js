import React, { Component } from 'react';
import IMAGE from './image';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: JSON.parse(localStorage.getItem("userData")).user_name
        }
        console.log();
    }

    render() {
        return (
            <header className="main_header">
                <div className="logo">
                    <Link to="/dashboard"><img src={IMAGE.logo} alt="" /></Link>
                </div>
                <div className="header_right_profile">
                    <Dropdown id="dropdown-custom-1">
                        <Dropdown.Toggle className="profile_btn">
                            <div className="profile_img">
                                <svg version="1.1" id="Layer_1" x="0px" y="0px"
                                	 viewBox="0 0 258.75 258.75" style={{enableBackground: "new 0 0 258.75 258.75"}}>
                                    <g>
                                    	<circle cx="129.375" cy="60" r="60"/>
                                    	<path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z"/>
                                    </g>
                                </svg>
                            </div>
                            {this.state.username}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="super-colors pull-right">
                            <li><Link to="/">Logout</Link></li>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* <div className="">
                        <div className="profile_img"></div>
                        Rakesh Sharma
                    </div> */}
                </div>
            </header>
        )
    }

}

export default Header;
