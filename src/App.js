import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/style.scss';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="body">
          <div className="flex-main">
            <Nav />
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
