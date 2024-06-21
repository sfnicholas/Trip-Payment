import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import "./App.css";
import * as FirebaseConnection from "./firebase-connection";
// import * as Backend from "./Backend";

function App() {
  const [addReceipt, setAddReceipt] = useState(false);
  const [newPersonName, setNewPersonName] = useState("");
  const [people, setPeople] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [tripId, setTripId] = useState("");
  const [defaultSettings, setDefaultSettings] = useState(
    {taxRate: 13, tipsRate: 0, discountRate: 0});

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
      if (people.includes(name)){
        console.log("Person already exists");
        setErrorMessage("Person already exists");
        return;
      }
      setPeople([...people, name]);
      setNewPersonName("");
      const tripDetails = { participants: [...people, name] };
      await FirebaseConnection.updateTripFields(tripId, tripDetails);
    } catch (error) {
      console.error("Error adding person to trip:", error);
      setErrorMessage("Failed to add person to the trip: " + error.message);
    }
  };

  // // Expenses
  // function ExpenseForm({ show, onClose }) {
  //   if (!show) return null;
  
  //   return (
  //     <div className="modal-backdrop">
  //       <div className="modal-content">
  //         <span className="close-button" onClick={onClose}>&times;</span>
  //         <h2>Create New Expense</h2>
  //         {/* Form Fields Here */}
  //         <button onClick={onClose}>Submit</button>
  //         <button onClick={onClose}>Save for Later</button>
  //       </div>
  //     </div>
  //   );
  // }
  

  return (
    <div className="App">
      <h1>AA Expenses Tracker</h1>
      <button onClick={() => toggleModal(setAddReceipt)} className="button">
        Create New Expenses
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
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
      {addReceipt && <ExpenseForm show={addReceipt} onClose={() => setAddReceipt(false)} config = {{...defaultSettings, people}}/>}
    </div>
  );
}

export default App;
