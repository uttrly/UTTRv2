import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

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
import CreateGoal from "./pages/createGoal"
import PrivateRoute from "./components/private-route/PrivateRoute"


<<<<<<< HEAD
function App() {
  return (
    <Router>
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <Nav />
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
        <Footer />
      </div>
    </Router>
  );
=======
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={{ backgroundColor: "#FFFFFF" }}>
            <Nav />
              <Switch>
                <Route exact path="/" component={Main}/>
                <Route exact path="/team" component={TeamPage}/> 
                <Route exact path="/about" component={About}/>
                <Route exact path="/terms" component={Terms}/>
                <Route exact path="/signin" component={Signin}/>
                <Route exact path="/signup" component={Signup}/>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>     
                <PrivateRoute exact path="/challenge" component={Challenge}/>
                <PrivateRoute exact path="/createGoal" component={CreateGoal} />  
                <Route component={Err} />       
              </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>  
    );
  }
>>>>>>> master
}

export default App;
