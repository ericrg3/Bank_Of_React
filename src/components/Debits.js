// src/components/Debits.js

import React, {Component} from "react";
import {Link} from 'react-router-dom';
import AccountBalance from "./AccountBalance";

class Debits extends Component{
  constructor(props){
    super(props)
    this.state = {
      description: "",
      amount: 0,
    }
  }
  // When the user name input is changed, capture the input and update the state (user.userName)
  handleChange = (e) => {
    const updatedUser = {...this.state.user};
    const inputField = e.target.name;
    const inputValue = e.target.value;
  }

// When user clicked "Log In" button, store user data and then redirect to "User Profile" page
handleSubmit = (e) => {
  e.preventDefault()
  this.props.addDebit(this.state.Debit)
  this.setState({redirect: true})
}

render(){
  return (
    <div>
      <img src="https://picsum.photos/200/200" alt="bank"/>
      <h1>Debits</h1>
      {this.debitView()}
      <AccountBalance accountBalance ={this.props.accountBalance}/>
      <form onSubmit={this.handleSubmit}>
      
      <label>Description: 
        <input type="text" name="description" />
        </label>

        <label> Amount:
        <input type="number" name="amount" />
        </label>
        
        <button type="submit">Add Debit</button>
      </form>
      
      
      <Link to="/">Return to Home</Link>
      <br></br>
      <Link to="/credit">Credits</Link>
    </div>
    );
  }
}



export default Debits;