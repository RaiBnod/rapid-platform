import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Home from '../components/Home';
import DynamicPage from '../components/DynamicPage';
import Loading from '../components/Loading';

function AppRouter() {
  return (
    <Router>
      <Loading />
      <Header />
      <div className="body">
        <div className="flex-main">
          <Nav />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/:book/:page">
              <DynamicPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default AppRouter;
