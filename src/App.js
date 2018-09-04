import React, { Component } from 'react';
import RouteComponent from './routes';
import './style/bootstrap.min.css';
import './style/App.css';

class App extends Component {
    render() {
        return (
            <div className="main_wrapper">
                <RouteComponent />
            </div>
        );
    }
}

export default App;
