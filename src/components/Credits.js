// src/components/Debits.js

import {Link} from 'react-router-dom';
import AccountBalance from "./AccountBalance";

const Credits = (props) => {
	let creditsView = () => {
    const { credits } = props;
    return credits.map((credits) => {
      let date = credits.date.slice(0,10);
      return <li key={credits.id}>{credits.amount} {credits.description} {date}</li>
    }) 
  }

return (
  <div>
    <h1>Credits</h1>
    {creditsView()}
    <form onSubmit={props.addCredit}>
      <input type="text" name="description" />
      <input type="number" name="amount" />
      <button type="submit">Add Credit</button>
    </form>
    <AccountBalance accountBalance={props.accountBalance}/>

    <Link to="/">Return to Home</Link>
    <br></br>

    <Link to="/debit">Debits</Link>

    <Link to="/credit">Credits</Link>
  </div>
)
}

export default Credits;