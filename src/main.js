import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import { render } from 'react-dom';
import App from './App';

render(
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/:filterName" component={App} />
        </Switch>
    </Router>
    , document.getElementById('root')
);
