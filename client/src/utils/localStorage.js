export const getTrasactionsIds = () => {
    const TrasactionsIds = localStorage.getItem('Transactions')
        ? JSON.parse(localStorage.getItem('Transactions'))
        : [];

    return TrasactionsIds;
};

export const TrasactionsIds = (trasactionIdArr) => {
    if (trasactionIdArr.length) {
        localStorage.setItem('Transactions', JSON.stringify(trasactionIdArr));
    } else {
        localStorage.removeItem('Transactions');
    }
};

export const removeTransactionId = (trasactionId) => {
    const TransactionsIds = localStorage.getItem('Transactions')
        ? JSON.parse(localStorage.getItem('Transactions'))
        : null;

    if (!TransactionsIds) {
        return false;
    }

    const updatedTransactionsIds = TransactionsIds?.filter((TrasactionsId) => TrasactionsId !== trasactionId);
    localStorage.setItem('Transactions', JSON.stringify(updatedTransactionsIds));

    return true;
};
