import React, { Component } from 'react';
import axios from 'axios';
import IMAGE from '../../common/image';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loginLoading: false
        }
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
    }

    doSignin(e) {
        // console.log(this.state.username);
        // console.log(this.state.password);
        e.preventDefault();
        this.setState({
            loginLoading: true
        })
        let req = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post("https://hdfc.salesgovisits.com/wapi/1/wlogin", req)
            .then(res => {
                console.log(res);
                this.setState({
                    loginLoading: false
                })
                if(res.data.status === "200") {
                    let userData = {
                        user_name: res.data.user_name,
                        user_id: res.data.user_id
                    }
                    localStorage.setItem("authToken", res.data.session_id);
                    localStorage.setItem("userData", JSON.stringify(userData));
                    setTimeout(() => {
                        this.props.history.push('/dashboard');
                    })
                }
                else {
                    alert("Invalid credential. Username or password is not correct");
                }
                // this.setState({
                //     visitTypeContributionData: res.data
                // })
            })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="login_wrap">
                <div className="login_left">
                    <h1>"If You Are Not Taking Care Of Your Customer, Your Competitor Will." <span>– Bob Hooey</span></h1>
                </div>
                <div className="login_right">
                    <div className="login_right_inner">
                        <div className="sales_go_logo">
                            <img src={IMAGE.salesgoLogo} alt="" />
                        </div>
                        <h2>Login</h2>
                        <form>
                            <div className="form_row login_form_row">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="login_input"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange.bind(this)} />
                                <div className=""></div>
                            </div>
                            <div className="form_row login_form_row">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="login_input"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange.bind(this)} />
                                {/*<div className="text-right forgot_pass">
                                    <a href="/">Forgot Password?</a>
                                </div>*/}
                            </div>
                            <div className="form_row login_form_row text-center">
                                <button
                                    disabled={this.state.loginLoading}
                                    type="submit"
                                    className="login_btn"
                                    onClick={this.doSignin.bind(this)}>
                                    Login
                                    <img
                                        alt=""
                                        src={IMAGE.loader_img}
                                        style={{width: "20px", marginLeft: "15px", display: this.state.loginLoading === true ? "inline-block" : "none"}} />
                                </button>
                                {/*<Link to={'/dashboard'} className="login_btn">Login</Link>*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
