import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Timeline from './pages/timeline/timeline';
import UpdateVisits from './pages/update-visits/updateVisits';
import Accounts from './pages/accounts/accounts';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("authToken") && localStorage.getItem("authToken") !== "" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class RouteComponent extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path={process.env.PUBLIC_URL + '/'} component={Login} />
                    <PrivateRoute path={process.env.PUBLIC_URL + '/dashboard'} component={Dashboard} />
                    <PrivateRoute path={process.env.PUBLIC_URL + '/timeline'} component={Timeline} />
                    <PrivateRoute path={process.env.PUBLIC_URL + '/update-visits'} component={UpdateVisits} />
                    <PrivateRoute path={process.env.PUBLIC_URL + '/accounts'} component={Accounts} />
                </div>
            </Router>
        )
    }
}

export default RouteComponent;
