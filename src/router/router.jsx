import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Home from '../pages/Home/index';
import Page1 from '../pages/Page1/index';


const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Home}/>
            </Switch>
        </div>
    </Router>
);
export default getRouter;