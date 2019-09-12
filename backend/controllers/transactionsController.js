const list = require('../repTransactions.json');

const listTransactions = () => {
  return list.repTransactions;
};

const getTransaction = id => {
  const transactions = listTransactions();
  const transaction = transactions.find(transaction => {
    return transaction.id == id;
  });

  if (!transaction) {
    return undefined;
  }

  return transaction;
};

const updateTransaction = (id, updatedTransaction) => {
  const transaction = getTransaction(id);

  if (!transaction) {
    return undefined;
  }

  transaction.userId = updatedTransaction.userId;
  transaction.recipientId = updatedTransaction.recipientId;
  transaction.amount = updatedTransaction.amount;
  transaction.status = updatedTransaction.status;

  return transaction;
};

module.exports = {
  listTransactions,
  getTransaction,
  updateTransaction,
};
