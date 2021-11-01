import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';

import {
  Psd,
  Toast,
  Glotoon,
} from './pages';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/toast">
            <Toast />
          </Route>
          <Route path="/psd">
            <Psd />
          </Route>
          <Route path="/glotoon">
            <Glotoon />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
