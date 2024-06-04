import React, { useState } from 'react';
import Modal from './Modal';
import './App.css';

function App() {

  const [showModal, setShowModal] = useState(false); 

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="App">
      <p>AA Expenses Tracker</p>
      <button onClick={toggleModal} className="button">
        Show Modal
      </button>
      <Modal show={showModal} onClose={toggleModal} title="My Modal"></Modal>
    </div>
  );
}

export default App;
