import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTransaction } from "../../redux/features/transictions/transactionSlice";

const Form = () => {
  const { isLoading, isError } = useSelector((state) => state.transaction);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const handelCreate = (e) => {
    e.preventDefault();
    dispatch(postTransaction({ name, type, amount: Number(amount) }));
    if (!isLoading && !isError) {
      setAmount("");
      setName("");
      setType("");
    }
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={handelCreate}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="My Salary"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value={type}
              onChange={() => setType("income")}
              name="transaction_type"
              checked={type == "income"}
              required
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              name="transaction_type"
              placeholder="Expense"
              checked={type == "expense"}
              onChange={() => setType("expense")}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="number"
            placeholder="300"
            name="transaction_amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button className="btn" disabled={isLoading}>
          Add Transaction
        </button>
      </form>
      {!isLoading && isError && <p className="error">An error occoured !</p>}

      <button className="btn cancel_edit">Cancel Edit</button>
    </div>
  );
};

export default Form;
