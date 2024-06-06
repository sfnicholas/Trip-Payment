// src/PersonCard.js
import React from 'react';
import './PersonCard.css';

function PersonCard({ name, transactions }) {
  return (
    <div className="person-card">
      <h2 className="person-name">{name}</h2>
      <div className="transactions">
        {transactions.map((transaction, index) => (
          <p key={index}>{transaction}</p>
        ))}
      </div>
    </div>
  );
}

export default PersonCard;