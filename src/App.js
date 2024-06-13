import React, { useState } from "react";
import Modal from "./Modal";
import "./App.css";
import PersonCard from "./PersonCard";

function App() {
  const [addReceipt, setAddReceipt] = useState(false);

  const toggleModal = (setModal) => {
    // setShowModal(!showModal);
    setModal((prevState) => !prevState);
  };

  const peopleData = [
    {
      name: "A",
      transactions: ["A→C: $5000 and ¥0", "A→B: $710 and ¥550"],
    },
    {
      name: "B",
      transactions: ["B→A: $1090 and ¥5000", "B→C: $3500 and ¥0"],
    },
    {
      name: "C",
      transactions: ["C→A: $1240 and ¥5000", "C→B: $920 and ¥660"],
    },
    {
      name: "D",
      transactions: [],
    },
  ];

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
        {peopleData.map((person, index) => (
          <PersonCard
            key={index}
            name={person.name}
            transactions={person.transactions}
          />
        ))}
        <div className="new-person-card">
          <button className="add-button">+ New</button>
        </div>
      </div>
            
      {/*add receipt button*/}

      <Modal
        show={addReceipt}
        onClose={() => toggleModal(setAddReceipt)}
        title="My Modal"
      ></Modal>
    </div>
  );
}

export default App;
