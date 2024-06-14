import { db } from './firebase-config';

/*
db structure: 

* groups
  - group1
  - group2
  * people
    - person1
      {name: personName, transactions: []}
    - person2
  * transactions
    - transaction1
      {description: transactionDescription, amount: transactionAmount, date: transactionDate, personId: personId}
    - transaction2
    - transaction3
*/

const addPersonToGroup = async (groupId, personName) => {
  const groupRef = db.collection('groups').doc(groupId);
  const personRef = groupRef.collection('people').doc();
  await personRef.set({
    name: personName,
    transactions: []
  });
};

const addTransactionToPerson = async (groupId, personId, transactionData) => {
  const transactionRef = db.collection('groups').doc(groupId)
                            .collection('people').doc(personId)
                            .collection('transactions').doc();

  await transactionRef.set(transactionData);
};
