// src/components/Debits.js


import {Link} from 'react-router-dom';
import AccountBalance from "./AccountBalance";

const Debits = (props) => {
	let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    }) 
  }
  return (
    <div>
      <h1>Debits</h1>
      {debitsView()}
      <form onSubmit={props.addDebit}>
        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
      <AccountBalance accountBalance={props.accountBalance}/>

      <Link to="/">Return to Home</Link>
      <br></br>

      <Link to="/debit">Debits</Link>

      <Link to="/credit">Credits</Link>
    </div>
  )
}

export default Debits;