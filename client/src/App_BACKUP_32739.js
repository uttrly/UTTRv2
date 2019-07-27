import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import CreateGoal from "./pages/createGoal";


function App() {
  return (
    <Router>
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <Nav />
<<<<<<< HEAD
<<<<<<< HEAD
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/team" component={TeamPage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/challenge" component={Challenge} />
          <Route exact path="/createGoal" component={CreateGoal} />
          <Route component={Err} />
        </Switch>
=======
=======

>>>>>>> master
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/team" component={TeamPage}/> 
            <Route exact path="/about" component={About}/>
            <Route exact path="/terms" component={Terms}/>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/dashboard" component={Dashboard}/>     
            <Route exact path="/challenge" component={Challenge}/>
            <Route exact path="/createGoal" component={CreateGoal} />  
            <Route component={Err} />       
          </Switch>
<<<<<<< HEAD
>>>>>>> master
=======

>>>>>>> master
        <Footer />
      </div>
    </Router>
  );
}

export default App;
