export const getTransactionIds = () => {
    const TrasactionsIds = localStorage.getItem('Transactions')
        ? JSON.parse(localStorage.getItem('Transactions'))
        : [];

    return TrasactionsIds;
};

export const saveTransactionIds = (Transaction_idArr) => {
    if (Transaction_idArr.length) {
        localStorage.setItem('Transactions', JSON.stringify(Transaction_idArr));
    } else {
        localStorage.removeItem('Transactions');
    }
};

export const removeTransactionId = (Transaction_id) => {
    const TransactionsIds = localStorage.getItem('Transactions')
        ? JSON.parse(localStorage.getItem('Transactions'))
        : null;

    if (!TransactionsIds) {
        return false;
    }

    const updatedTransactionsIds = TransactionsIds?.filter((TrasactionsId) => TrasactionsId !== Transaction_id);
    localStorage.setItem('Transactions', JSON.stringify(updatedTransactionsIds));

    return true;
};
