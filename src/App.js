import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "./App.css";
import * as FirebaseConnection from "./firebase-connection"; 

const DEFAULT_GROUP_ID = "defaultGroupId"; 

function App() {

//   useEffect(() => {
//     FirebaseConnection.createGroup().catch(console.error);
//   }, []);

//   return (
//     <div className="App">
//       <h1>Create Group Test</h1>
//     </div>
//   );
// }

  const [addReceipt, setAddReceipt] = useState(false);
  const [newPersonName, setNewPersonName] = useState("");
  const [people, setPeople] = useState([]);

  const toggleModal = (setModal) => {
    setModal((prevState) => !prevState);
  };

  // transaction summary functions
  const initializeTransactionsSummary = (name) => {
    return people.map((person) => ({
      from: name,
      to: person.name,
      amount: "¥0",
    }));
  };

  const updateExistingPeople = (name) => {
    setPeople(prevPeople =>
      prevPeople.map(person => ({
        ...person,
        transactionsSummary: [...person.transactionsSummary, { from: person.name, to: name, amount: "¥0" }]
      }))
    );
  };

  const addPeople = async (name) => {
    if (!name.trim()) {
      return;
    }
    try {
      const transactionsSummary = initializeTransactionsSummary(name);
      const newPerson = { name: name, transactionsSummary: transactionsSummary };

      // Add person to Firebase
      await FirebaseConnection.addPersonToGroup(DEFAULT_GROUP_ID, name);  
      updateExistingPeople(name);
      setPeople((prevPeople) => [...prevPeople, newPerson]);
      setNewPersonName(""); 
    }
    catch (error) {
      console.error("Failed to add person to Firebase:", error);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addPeople(newPersonName);
    }
  };

  return (
    <div className="App">
      <h1>AA Expenses Tracker</h1>
      <button onClick={() => toggleModal(setAddReceipt)} className="button">
        Add Receipt
      </button>
      <button onClick={() => toggleModal()} className="button">
        Update Receipts
      </button>
      <button onClick={() => toggleModal()} className="button">
        All Expenses
      </button>
      <div className="People">
        <h2>People</h2>
        {people.map((person, index) => (
          <div className="person-card" key={index}>
            <h2 className="person-name">{person.name}</h2>
            <div className="transactionsSummary">
              {person.transactionsSummary.map((transactionSummary, index) => (
                <p key={index}>
                  {transactionSummary.from}→{transactionSummary.to} {transactionSummary.amount}
                </p>
              ))}
            </div>
          </div>
        ))}
        <div className="new-person-card">
          <input
            type="text"
            value={newPersonName}
            onChange={(event) => setNewPersonName(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add new people"
          />
          <button
            className="add-button"
            onClick={() => addPeople(newPersonName)}
          >
            Add +
          </button>
        </div>
      </div>

      <Modal
        show={addReceipt}
        onClose={() => toggleModal(setAddReceipt)}
        title="My Modal"
      ></Modal>
    </div>
  );
}

export default App;