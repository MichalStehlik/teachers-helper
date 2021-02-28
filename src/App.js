import React from 'react';
import {createBrowserHistory} from "history";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {AppProvider} from "./providers/ApplicationProvider";
import { Container } from 'reactstrap';
import './App.css';

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Setup from "./components/Setup";
import Order from "./components/Order";
import Navigation from "./components/Navigation";
import Countdown from "./components/Countdown";
import RandomStudent from "./components/RandomStudent";
import Random from "./components/Random";

const history = createBrowserHistory({ basename: "/helper/"});

function App() {
  return (
    <AppProvider>  
      <BrowserRouter history={history} basename="/helper">
        <Navigation />
        <Container className="main-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/setup" component={Setup} />
            <Route path="/order" component={Order} />
            <Route path="/random" component={Random} />
            <Route path="/countdown/:hours?/:minutes?/:seconds?" component={Countdown} />
            <Route path="/random-student" component={RandomStudent} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
