import React, { useState, useEffect } from "react";
import "./ExpenseForm.css";

function ExpenseForm({ show, onClose, config }) {
  const [mode, setMode] = useState("equal");
  const [title, setTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [involvedPeople, setInvolvedPeople] = useState([]);
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [showOptional, setShowOptional] = useState(false);
  const [amountSummary, setAmountSummary] = useState({});

  const toggleOptional = () => setShowOptional(!showOptional);

  // Exact Value (Simplify) Form
  const [taxChecked, setTaxChecked] = useState(false);
  const [tipsChecked, setTipsChecked] = useState(false);
  const [discountChecked, setDiscountChecked] = useState(false);
  const [taxRate, setTaxRate] = useState("");
  const [tipsRate, setTipsRate] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [amountInput, setAmountInput] = useState({});
  const [calculatedTotalAmount, setCalculatedTotalAmount] = useState(0);

  // Excat Value (Detail) Form\
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    if (config) {
      setInvolvedPeople(config.people);
    }
  }, [config]);

  useEffect(() => {
    updateAmounts();
  }, [
    taxChecked,
    tipsChecked,
    discountChecked,
    taxRate,
    tipsRate,
    discountRate,
    involvedPeople,
    amountInput,
  ]);

  useEffect(() => {
    updateAmounts();
  }, [totalAmount]);

  useEffect(() => {
    if (
      mode === "equal" ||
      mode === "exactSimplify" ||
      mode === "exactDetail"
    ) {
      setAmountInput({});
      updateAmounts();
    }
  }, [mode]);

  //common functions:
  const handleSubmit = (event) => {
    event.preventDefault();
    const expenseData = {
      mode,
      totalAmount,
      payer,
      involvedPeople,
      note,
      category,
      taxRate: taxChecked ? taxRate : undefined,
      tipsRate: tipsChecked ? tipsRate : undefined,
      discountRate: discountChecked ? discountRate : undefined,
      amountSummary,
    };
    console.log("Submitting:", expenseData);
  };
  const payerSection = () => (
    <div className="form-section">
      <label>Payer:</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="">Select Payer</option>
        {config.people.map((person, index) => (
          <option key={index} value={person}>
            {person}
          </option>
        ))}
      </select>
    </div>
  );
  const updateAmounts = () => {
    console.log("updateAmount called");
    const newAmountSummary = {};
    involvedPeople.forEach((person) => {
      if (mode === "equal") {
        const baseAmount = parseFloat(totalAmount / involvedPeople.length) || 0;
        newAmountSummary[person] = baseAmount.toFixed(2);
      } else if (mode === "exactSimplify") {
        let finalTaxRate = taxRate === "" ? config.taxRate : taxRate;
        let finalTipsRate = tipsRate === "" ? config.tipsRate : tipsRate;
        let finalDiscountRate =
          discountRate === "" ? config.discountRate : discountRate;
        const baseAmount = parseFloat(amountInput[person]) || 0;
        let tax = 0;
        let tips = 0;
        let discount = 0;

        if (taxChecked) tax = baseAmount * (finalTaxRate / 100);
        if (tipsChecked) tips = baseAmount * (finalTipsRate / 100);
        if (discountChecked) discount = baseAmount * (finalDiscountRate / 100);

        const newAmount = baseAmount + tax + tips - discount;
        newAmountSummary[person] = newAmount.toFixed(2);
      }
    });
    if (mode === "exactSimplify") {
      let total = 0;
      involvedPeople.forEach((person) => {
        total += parseFloat(newAmountSummary[person]);
      });
      setCalculatedTotalAmount(total.toFixed(2));
    }
    setAmountSummary(newAmountSummary);
    console.log("newAmountSummary", newAmountSummary);
  };
  const submissionSection = () => (
    <div className="form-section submission-section">
      <button className="save-for-later" onClick={onClose}>
        Save for Later
      </button>
      <button onClick={onClose}>Submit</button>
    </div>
  );

  //equal split
  const involvedPeopleSection = () => (
    <div className="form-section">
      <label>Involved People:</label>
      {config.people.map((person, index) => (
        <label key={index}>
          <input
            type="checkbox"
            checked={involvedPeople.includes(person)}
            onChange={(e) => {
              const newInvolvedPeople = e.target.checked
                ? [...involvedPeople, person]
                : involvedPeople.filter((p) => p !== person);
              setInvolvedPeople(newInvolvedPeople);
              updateAmounts();
            }}
          />
          {person}
        </label>
      ))}
    </div>
  );
  const opotionalFillInSection = () => (
    <div className="form-section">
      <button type="button" onClick={toggleOptional}>
        Optional Fill In {showOptional ? "▲" : "▼"}
      </button>
      {showOptional && (
        <div className="optional-section">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label>Note:</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="resort">Resort</option>
            <option value="shopping">Shopping</option>
            <option value="others">Others</option>
          </select>
          {mode === "exactSimplify" && (
            <>
              <label>Entered Total Amount:</label>
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="Enter total amount"
              />
            </>
          )}
        </div>
      )}
    </div>
  );

  // Exact Value (Simplify)
  const taxTipsDiscountSection = () => (
    <div className="form-section">
      <div className="form-row">
        <input
          id="taxCheckbox"
          type="checkbox"
          checked={taxChecked}
          onChange={() => {
            setTaxChecked(!taxChecked);
          }}
        />
        <label htmlFor="taxCheckbox">Need to add Tax?</label>
        <input
          type="number"
          value={taxRate}
          onChange={(e) => {
            setTaxRate(e.target.value);
          }}
          disabled={!taxChecked}
          placeholder={`(Default ${config.taxRate}%)`}
        />
      </div>
      <div className="form-row">
        <input
          id="tipsCheckbox"
          type="checkbox"
          checked={tipsChecked}
          onChange={() => {
            setTipsChecked(!tipsChecked);
          }}
        />
        <label htmlFor="tipsCheckbox">Need to Add Tips?</label>
        <input
          type="number"
          className="input-number"
          value={tipsRate}
          onChange={(e) => {
            setTipsRate(e.target.value);
          }}
          disabled={!tipsChecked}
          placeholder={`(Default ${config.tipsRate}%)`}
        />
      </div>
      <div className="form-row">
        <input
          id="discountCheckbox"
          type="checkbox"
          checked={discountChecked}
          onChange={() => {
            setDiscountChecked(!discountChecked);
          }}
        />
        <label htmlFor="discountCheckbox">Need to Add Discount?</label>
        <input
          type="number"
          value={discountRate}
          onChange={(e) => {
            setDiscountRate(e.target.value);
          }}
          disabled={!discountChecked}
          placeholder={`(Default ${config.discountRate}%) off`}
        />
      </div>
    </div>
  );
  const handleInputChange = (person, value) => {
    const newAmountInput = { ...amountInput };
    const baseAmount = parseFloat(value) || 0;
    newAmountInput[person] = baseAmount.toFixed(2);
    setAmountInput(newAmountInput);
  };
  // Exact Value (Detial)
  const handleAddDish = () => {
    setDishes([...dishes, { name: "", price: "", people: [] }]);
  };

  const simplifyExactInvolvedPeopleSection = () => (
    <div className="form-section">
      <label>Involved People:</label>
      {config.people.map((person, index) => (
        <div key={index} className="form-row">
          <input
            type="checkbox"
            checked={involvedPeople.includes(person)}
            onChange={(e) => {
              const newInvolvedPeople = e.target.checked
                ? [...involvedPeople, person]
                : involvedPeople.filter((p) => p !== person);
              setInvolvedPeople(newInvolvedPeople);
              updateAmounts();
            }}
          />
          {person}
          {involvedPeople.includes(person) && payer && (
            <div className="exact-simplify-involve-people-description">
              {person === payer ? `${person}: $` : `${person} → ${payer}: $`}
            </div>
          )}
          {involvedPeople.includes(person) && (
            <input
              type="number"
              className="short-input"
              onChange={(e) => handleInputChange(person, e.target.value)}
              placeholder="Amount"
            />
          )}
        </div>
      ))}
    </div>
  );
  const conclusionSection = () => (
    <div className="form-section conclusion">
      <h3>Conclusion:</h3>
      {console.log("Conlcuison", amountSummary)}
      {payer &&
        config.people.map((person, index) =>
          involvedPeople.includes(person) ? (
            <p key={index}>
              {person !== payer
                ? `${person} → ${payer}: $${amountSummary[person]}`
                : `${person}: $${amountSummary[person]}`}
            </p>
          ) : null
        )}
      {!payer &&
        config.people.map((person, index) =>
          involvedPeople.includes(person) ? (
            <p key={index}>{`${person}: $${amountSummary[person]}`}</p>
          ) : null
        )}
      {mode === "exactSimplify" && (
        <>
          <p>Sum Up: ${calculatedTotalAmount}</p>
          {totalAmount && <p>Entered Total Amount: ${totalAmount}</p>}
        </>
      )}
      {mode === "equal" && <p>Total Amount: ${totalAmount}</p>}
    </div>
  );

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="expense-form">
        <form onSubmit={handleSubmit}>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          <div className="header-container">
            <div>
              <h2>Title: </h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-section mode-section">
              <label style={{ marginRight: "10px", marginBottom: "0px" }}>
                Mode:
              </label>
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="equal">Equally Split</option>
                <option value="exactSimplify">Exact Value (Simplify)</option>
                <option value="exactDetail">Exact Value (Detail)</option>
              </select>
            </div>
          </div>

          {/* Equal Splitting Form */}
          {mode === "equal" && (
            <div className="equal-splitting-form">
              <div className="form-section">
                <label>Total Amount:</label>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </div>
              {payerSection()}
              {involvedPeopleSection()}
              <hr />
              {opotionalFillInSection()}
              <hr />
              {conclusionSection()}
              {submissionSection()}
            </div>
          )}

          {/* Exact Value (Simplify) Form */}
          {mode === "exactSimplify" && (
            <div className="exact-simplify-form">
              {taxTipsDiscountSection()}
              {payerSection()}
              {simplifyExactInvolvedPeopleSection()}
              <hr />
              {opotionalFillInSection()}
              <hr />
              {conclusionSection()}
              {submissionSection()}
            </div>
          )}
          {mode === "exactDetail" && (
            <div className="exact-detail-form">
              {taxTipsDiscountSection()}
              <div className="App">
                <div className="add-dish">
                  <h2>Add/Edit Dish</h2>
                  <div className="dish-input">
                    <label>
                      Dish: <input type="text" />
                    </label>
                    <label>
                      Price: <input type="text" />
                    </label>
                    <button onClick={handleAddDish}>Add Dish</button>
                  </div>
                </div>
                <div className="dishes">
                  <h2>Dishes</h2>
                  <div className="dish-list">
                    {dishes.map((dish, index) => (
                      <div key={index} className="dish-item">
                        <label>
                          Dish {index + 1}:{" "}
                          <input type="text" value={dish.name} />
                        </label>
                        <label>
                          Price: <input type="text" value={dish.price} />
                        </label>
                        <label>
                          People:{" "}
                          <input type="text" value={dish.people.join(", ")} />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="people-dishes">
                  <h2>People</h2>
                  <div className="people-columns">
                    <div className="person-column">
                      <h3>A</h3>
                      <label>
                        <input type="checkbox" /> Dish 1
                      </label>
                      <label>
                        <input type="checkbox" /> Dish 2
                      </label>
                      <label>
                        <input type="checkbox" /> Dish 3
                      </label>
                    </div>
                    <div className="person-column">
                      <h3>B</h3>
                      <label>
                        <input type="checkbox" /> Dish 1
                      </label>
                      <label>
                        <input type="checkbox" /> Dish 2
                      </label>
                      <label>
                        <input type="checkbox" /> Dish 3
                      </label>
                    </div>
                    <div className="person-column">
                      <h3>C</h3>
                      <label>
                        <input type="checkbox" /> Dish 1
                      </label>
                      <label>
                        <input type="checkbox" /> Dish 2
                      </label>
                      <label>
                        <input type="checkbox" /> Dish 3
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
