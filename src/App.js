// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';
import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '07/23/96',
      },
      debitsArray: [],
      creditsArray: [],
    }
  }

  async componentDidMount(){
    let linkforDebitsAPI = 'https://moj-api.herokuapp.com/debits'; //Debits API link
    let linkforCreditsAPI = 'https://moj-api.herokuapp.com/credits'; //Credits API link

    try{
      let infoDebits = await axios.get(linkforDebitsAPI);
      let infoCredits = await axios.get(linkforCreditsAPI);
      this.setState({Debits: infoDebits.data}); //store data
      this.setState({Credits: infoCredits.data});
    }
    catch (error){
      if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
      }
    }
  }
  //This will update credit and updated accout balance
  addCredits = (credits) => {
    const newCredits = this.state.creditsArray;
    newCredits.push(credits);// adding a new value
    
    let updatedAccountBalance = this.state.accountBalance;
    updatedAccountBalance = updatedAccountBalance + + credits.amount; // + + is adding more credit
    this.setState({credits: Credits, accountBalance: updatedAccountBalance});
  }

  addDebits = (debits) => {
    const newDebits = this.state.debitsArray;
    newDebits.push(debits);// adding a new value
    
    let updatedAccountBalance = this.state.accountBalance;
    updatedAccountBalance = updatedAccountBalance - - debits.amount; // - - is subtracting more credit
    this.setState({debits: Credits, accountBalance: updatedAccountBalance});
  }
  
  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
    const DebitsComponent = () => (<Debits accountBalance={this.state.accountBalance} debitsArray={this.state.debitsArray} addDebits={this.addDebits}/>);
    const CreditsComponent = () => (<Credits accountBalance={this.state.accountBalance} creditsArray={this.state.creditsArray} addCredits={this.addCredits}/>);

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debits" render={DebitsComponent}/>
            <Route exact path="/credits" render={CreditsComponent}/>
          </div>
        </Router>
    );
  }
}

export default App;