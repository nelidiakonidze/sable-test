import React from 'react';
import {URLS} from './api/urls';
import Card from './components/Card';
import './styles/card.css';

export interface Transaction {
  id: number;
  userId: string;
  recipientId: string;
  // TODO: change to number
  amount: string;
  status?: Status;
}

export enum Status {
  Blocked = 'blocked',
  Allowed = 'allowed',
  None = 'none',
}

interface AppState {
  transactions: Transaction[];
}

export default class App extends React.Component {
  state: AppState = {
    transactions: [],
  };

  componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions = () => {
    fetch(URLS.transactions)
      .then(res => res.json())
      .then(transactions => {
        this.setState({
          transactions: transactions,
        });
      })
      .catch(error => console.log(error));
  };

  updateTransaction = (id: number, updatedTransaction: Transaction) => {
    fetch(`${URLS.transactions}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedTransaction),
    });
  };

  onClickHandler = (id: number, status: Status) => {
    console.log(`going to change state of ${id} to ${status}`);

    // find the old transaction by comparing the id of with the one clicked
    const oldTransaction = this.state.transactions.find(
      transaction => transaction.id === id,
    );

    if (oldTransaction === undefined) {
      console.log(`transaction not found of ${id}`);
      return;
    }

    // create the new transaction, by updating the clicked status(button clicked)
    const updatedTransaction = {
      ...oldTransaction,
      status,
    };

    // updating the transaction in the backend
    this.updateTransaction(id, updatedTransaction);

    // fetching the new transactions updated
    this.fetchTransactions();
  };

  render() {
    return (
      <div className='page-container'>
        <div className='page-content'>
          <div>
            <h1 className='title'>Reported Transactions</h1>
          </div>
          <React.Fragment>
            {this.state.transactions.map(transaction => (
              <Card
                key={transaction.id}
                transaction={transaction}
                onClickHandler={this.onClickHandler}
              />
            ))}
          </React.Fragment>
        </div>
      </div>
    );
  }
}
