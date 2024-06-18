import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "./App.css";
import * as FirebaseConnection from "./firebase-connection";
// import * as Backend from "./Backend";

const tripDetails = {
  name: "Trip to Vegas",
  // startDate: "2024-01-01",
  // endDate: "2024-01-05",
  participants: [],
};

const expenseDetails = {
  description: "Dinner at XYZ",
  amount: 100,
  payer: "A", // Assume 'A' is a participant ID or name
  date: "2024-01-02",
  owed: {
    B: 50, // Amount owed by B to A
    C: 50, // Amount owed by C to A
  },
};

function App() {
  const [addReceipt, setAddReceipt] = useState(false);
  const [newPersonName, setNewPersonName] = useState("");
  const [people, setPeople] = useState([]);
  const [tripId, setTripId] = useState("");

  // initial page loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripId = "2687OuSqVo9NMQLOY36C";
        const tripData = await FirebaseConnection.getTrip(tripId);
        setTripId(tripId);
        setPeople(tripData.participants);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleModal = (setModal) => {
    setModal((prevState) => !prevState);
  };

  // Trip Details
  const handleCreateTrip = async () => {
    try {
      const tripDetails = { participants: ["A"], name: "Go To Japan" };
      const tripId = await FirebaseConnection.createTrip(tripDetails);
      setTripId(tripId);
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  const addPerson = async (name) => {
    try {
      const tripDetails = { participants: [...people, name] };
      await FirebaseConnection.updateTripFields(tripId, tripDetails);
      setPeople([...people, name]);
      setNewPersonName("");
    } catch (error) {
      console.error("Error adding person to trip:", error);
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
      <button onClick={handleCreateTrip} className="button">
        Create Trip
      </button>
      <div className="People">
        <h2>People</h2>
        {people.map((person, index) => (
          <div className="person-card" key={index}>
            <h2 className="person-name">{person}</h2>
            {/* <div className="transactionsSummary">
              {person.transactionsSummary.map((transactionSummary, index) => (
                <p key={index}>
                  {transactionSummary.from}→{transactionSummary.to} {transactionSummary.amount}
                </p>
              ))}
            </div> */}
          </div>
        ))}
        <div className="new-person-card">
          <input
            type="text"
            value={newPersonName}
            onChange={(event) => setNewPersonName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addPerson(newPersonName);
              }
            }}
            placeholder="Add new people"
          />
          <button
            className="add-button"
            onClick={() => addPerson(newPersonName)}
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
