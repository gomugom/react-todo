import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Links from './Links';
import { Home, About, Name, Portfolio } from './Components';

const App = () => (
    <Router>
        <div>
            <Links />
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/about/name" component={Name} />
            <Switch>
                <Redirect from="/about/redirect1" to="/portfolio/1" />
                <Route exact path="/portfolio" component={Portfolio} />
                <Route path="/portfolio/:id" component={Portfolio} />
            </Switch>
        </div>
    </Router>
);

export default App;
