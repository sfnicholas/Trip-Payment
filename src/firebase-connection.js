import { db } from './firebase-config';
import { collection, doc, setDoc, updateDoc, getDoc} from "firebase/firestore";

/*
  Trips Collection
  /trips/{tripId}
  - name: "Trip to Vegas"
  - startDate: "2024-01-01"
  - endDate: "2024-01-05"z
  - participants: ["A", "B", "C"]
*/
/**
 * Creates a new trip and stores it in the Firestore database.
 * @param {Object} tripDetails - The details of the trip to create, including name, startDate, endDate, and participants.
 * @returns {Promise<string>} The ID of the newly created trip document.
 * @throws {Error} If the trip creation fails, an error is thrown with a message.
 */
export const createTrip = async (tripDetails) => {
  try {
    const tripsCol = collection(db, "trips");
    const tripDocRef = doc(tripsCol);
    await setDoc(tripDocRef, {
      ...tripDetails,
      id: tripDocRef.id  // Automatically generated document ID
    });
    console.log("Trip created with ID:", tripDocRef.id);
    return tripDocRef.id;  // Return the new trip ID
  } catch (error) {
    console.error("Error creating trip:", error);
    throw new Error("Failed to create trip");
  }
};

export const updateTripFields = async (tripId, updates) =>{
  try {
    const tripDocRef = doc(db, "trips", tripId);
    await updateDoc(tripDocRef, updates);
    console.log("Trip details updated successfully");
  } catch (error) {
    console.error("Error updating trip details:", error);
  }
}

export const getTrip = async (tripId) => {
  try {
    const tripDocRef = doc(db, "trips", tripId);
    const tripDoc = await getDoc(tripDocRef);
    if (tripDoc.exists()) {
      return tripDoc.data();
    } else {
      console.error("No trip found with ID:", tripId);
    }
  } catch (error) {
    console.error("Error fetching trip data:", error);
  }
}

// Expenses Collection
const updateOwesAmount = async (tripId, fromPerson, toPerson, newAmount) => {
  const tripSummaryRef = doc(db, "trips", tripId, "summaries", fromPerson);
  const owesField = `owes.${toPerson}`;

  try {
    await updateDoc(tripSummaryRef, {
      [owesField]: newAmount
    });
    console.log("Updated owes amount successfully");
  } catch (error) {
    console.error("Error updating owes amount:", error);
  }
};

// export const addExpenseToTrip = async (tripId, expenseDetails) => {
//   try {
//     const expensesCol = collection(db, `trips/${tripId}/expenses`);
//     const expenseDocRef = doc(expensesCol);
//     await setDoc(expenseDocRef, {
//       ...expenseDetails,
//       id: expenseDocRef.id  // Automatically generated document ID
//     });
//     console.log("Expense added with ID:", expenseDocRef.id);
//   } catch (error) {
//     console.error("Error adding expense to trip:", error);
//   }
// };

// const createGroup = async () => {
//   try {
//     const groupsCol = collection(db, "groups");
//     const groupDocRef = doc(groupsCol);
//     await setDoc(groupDocRef, {
//       id: groupDocRef.id,  // Use the automatically generated document ID
//       groupName: "Group 1",
//       description: "This is Group 1"
//     });
//     console.log("Group created with ID:", groupDocRef.id);
//   } catch (error) {
//     console.error("Error creating group:", error);
//   }
// };

// export const addPersonToGroup = async (groupId, personName, transactionSummary = []) => {
//   try {
//     const groupDocRef = doc(db, "groups", groupId);
//     const peopleColRef = collection(groupDocRef, "people"); 
//     const personDocRef = doc(peopleColRef); 
//     // await updateDoc(groupDocRef, updatedData);
//     await setDoc(personDocRef, {
//       name: personName,
//       transactions: {}
//     });
//   }
//   catch (error) {
//     console.error("Error adding person to group:", error);
//   }
// };

// export const addTransactionToPerson = async (groupId, personId, transactionData) => {
//   const transactionRef = db.collection('groups').doc(groupId)
//                             .collection('people').doc(personId)
//                             .collection('transactions').doc();

//   await transactionRef.set(transactionData);
// };

