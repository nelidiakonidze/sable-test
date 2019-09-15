const list = require('../repTransactions.json');

const resolvedTransactionsStatuses = ['blocked', 'allowed'];

const listTransactions = () => {
  const reportedTransactions = list.repTransactions;
  const filteredTransactions = reportedTransactions.filter(transaction => {
    if (resolvedTransactionsStatuses.includes(transaction.status)) {
      return false;
    } else {
      return true;
    }
  });

  return filteredTransactions;
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
