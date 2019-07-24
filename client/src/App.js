import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer'
import Main from './pages/Main'
import AboutPage from './pages/About'
import Err from './pages/404'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {
  return (
    <Router>
      <div style={{backgroundColor: "#FFFFFF"}}>
        <Nav />
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/about" component={AboutPage}/> 
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/signup" component={Signup}/>     
            <Route component={Err} />       
          </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
