import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux'
import store from "./store"

import './App.css';

import Nav from './components/Nav'
import Footer from './components/Footer'
import Main from './pages/Main'
import TeamPage from './pages/Team'
import About from './pages/About'
import Err from './pages/404'
import Terms from './pages/Terms'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Challenge from './pages/Challenge'


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div style={{backgroundColor: "#FFFFFF"}}>
          <Nav />
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route exact path="/team" component={TeamPage}/> 
              <Route exact path="/about" component={About}/>
              <Route exact path="/terms" component={Terms}/>
              <Route exact path="/signin" component={Signin}/>
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/dashboard" component={Dashboard}/>     
              <Route exact path="/challenge" component={Challenge}/>     
              <Route component={Err} />       
            </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>  
  );
}

export default App;
