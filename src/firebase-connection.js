import { db } from './firebase-config';
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

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

const createGroup = async () => {
  try {
    const groupsCol = collection(db, "groups");
    const groupDocRef = doc(groupsCol);
    await setDoc(groupDocRef, {
      id: groupDocRef.id,  // Use the automatically generated document ID
      groupName: "Group 1",
      description: "This is Group 1"
    });
    console.log("Group created with ID:", groupDocRef.id);
  } catch (error) {
    console.error("Error creating group:", error);
  }
};

const addPersonToGroup = async (groupId, personName) => {
  try {
    console.log(db);
    const groupDocRef = doc(db, "groups", groupId);
    const peopleColRef = collection(groupDocRef, "people"); 
    const personDocRef = doc(peopleColRef); 
    // await updateDoc(groupDocRef, updatedData);
    await setDoc(personDocRef, {
      name: personName,
      transactions: []
    });
  }
  catch (error) {
    console.error("Error adding person to group:", error);
  }
};

const addTransactionToPerson = async (groupId, personId, transactionData) => {
  const transactionRef = db.collection('groups').doc(groupId)
                            .collection('people').doc(personId)
                            .collection('transactions').doc();

  await transactionRef.set(transactionData);
};

export { createGroup, addPersonToGroup, addTransactionToPerson};
