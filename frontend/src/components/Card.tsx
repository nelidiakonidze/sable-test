import React from 'react';
import {Transaction, Status} from '../App';
import '../styles/card.css';

interface Props {
  transaction: Transaction;
  onClickHandler: (id: number, status: Status) => void;
}

const Card = (props: Props) => {
  const {transaction, onClickHandler} = props;

  return (
    <div className='Container'>
      <span className='list'>
        <li>
          <span className='bold-text'>Transaction Num: </span>
          {transaction.id}
        </li>
        <li>
          <span className='bold-text'>From user:</span> {transaction.userId}
        </li>
        <li>
          <span className='bold-text'>To user:</span> {transaction.recipientId}
        </li>
        <li>
          <span className='bold-text'>Amount</span>: {transaction.amount}
        </li>
        {transaction.status !== Status.None && (
          <li>
            <span className='bold-text'>Status:</span> {transaction.status}
          </li>
        )}
      </span>
      <div className='btn-container'>
        <button
          className='btn btn-block'
          onClick={() => {
            onClickHandler(transaction.id, Status.Blocked);
          }}>
          Block
        </button>
        <button
          className='btn btn-allow'
          onClick={() => {
            onClickHandler(transaction.id, Status.Allowed);
          }}>
          Allow
        </button>
      </div>
    </div>
  );
};

export default Card;
