import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./components/Home.js";
import Add from "./components/Add.js";
import Edit from "./components/Edit.js";

const App = () => {
    return(
        <Router className="App_container">
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/add">
                    <Add/>
                </Route>
                <Route path="/edit/:id">
                    <Edit/>
                </Route>
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App/>, document.getElementById('app'));
