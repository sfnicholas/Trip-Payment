import React, { useState } from 'react';
import "./Modal.css";

function Modal({ show, onClose, title }) {
  const [formData, setFormData] = useState({
    moneyOnReceipt: "",
    beforeTax: "",
    afterTax: 0,
    currency: "",
    date: "",
    paidBy: "",
    relatedTo: "",
    discountPercentage: 100,
    taxPercentage: 10,
    category: "",
    customField: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Handle data submission here
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form className="expense-details" onSubmit={handleSubmit}>
            <h1 className="title">Name of Expenses</h1>
            <div className="detail">
              <span className="label"># Money on receipt</span>
              <input
                type="text"
                name="moneyOnReceipt"
                value={formData.moneyOnReceipt}
                onChange={handleChange}
                className="value input"
              />
            </div>
            <div className="detail">
              <span className="label"># Before Tax</span>
              <input
                type="text"
                name="beforeTax"
                value={formData.beforeTax}
                onChange={handleChange}
                className="value input"
              />
            </div>
            <div className="detail">
              <span className="label">∑ After Tax</span>
              <input
                type="number"
                name="afterTax"
                value={formData.afterTax}
                onChange={handleChange}
                className="value input"
              />
            </div>
            <div className="detail">
              <span className="label">⏱ Currency</span>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="value input"
              />
            </div>
            <div className="detail">
              <span className="label">📅 Date</span>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="value input"
              />
            </div>
            <div className="detail">
              <span className="label">Paid by</span>
              <input
                type="text"
                name="paidBy"
                value={formData.paidBy}
                onChange={handleChange}
                className="value input"
              />
            </div>
            <div className="detail">
              <span className="label">Related to Individual</span>
              <input
                type="text"
                name="relatedTo"
                value={formData.relatedTo}
                onChange={handleChange}
                className="value input"
              />
            </div>
            <div className="detail">
              <span className="label"># Discount Percentage</span>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                className="value input"
              />
              <progress
                value={formData.discountPercentage}
                max="100"
              ></progress>
            </div>
            <div className="detail">
              <span className="label"># Tax Percentage</span>
              <input
                type="number"
                name="taxPercentage"
                value={formData.taxPercentage}
                onChange={handleChange}
                className="value input"
              />
              <progress value={formData.taxPercentage} max="100"></progress>
            </div>
            <div className="detail">
              <span className="label">Category</span>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="value input"
              />
            </div>
            <div className="detail">
              <span className="label">幫邊個碑錢</span>
              <input
                type="text"
                name="customField"
                value={formData.customField}
                onChange={handleChange}
                className="value input"
              />
            </div>
            <div className="detail">
              <button type="submit" onClick={onClose} className="submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
