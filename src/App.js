import React, { useState } from "react";
import Modal from "./Modal";
import "./App.css";

function App() {
  const [addReceipt, setAddReceipt] = useState(false);
  const [newPersonName, setNewPersonName] = useState("");
  const [people, setPeople] = useState([]);

  const toggleModal = (setModal) => {
    setModal((prevState) => !prevState);
  };

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

  const addPeople = (name) => {
    if (!name.trim()) {
      return;
    }
    const transactionsSummary = initializeTransactionsSummary(name);
    const newPerson = { name: name, transactionsSummary: transactionsSummary };
    updateExistingPeople(name);
    setPeople((prevPeople) => [...prevPeople, newPerson]);
    setNewPersonName(""); 
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
