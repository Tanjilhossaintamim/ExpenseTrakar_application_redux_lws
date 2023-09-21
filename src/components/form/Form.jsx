import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editInActive,
  postTransaction,
  updateTransaction,
} from "../../redux/features/transictions/transactionSlice";

const Form = () => {
  const { isLoading, isError, editing } = useSelector(
    (state) => state.transaction
  );
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();

  const reset = () => {
    setAmount("");
    setName("");
    setType("");
  };
  const handelCancelEdit = () => {
    setIsEditMode(false);
    dispatch(editInActive());
  };
  useEffect(() => {
    if (editing.id) {
      setIsEditMode(true);
      const { name: ename, type: etype, amount: eamount } = editing || {};
      setName(ename);
      setType(etype);
      setAmount(eamount);
    } else {
      reset();
    }
  }, [editing]);

  const handelCreate = (e) => {
    e.preventDefault();
    dispatch(postTransaction({ name, type, amount: Number(amount) }));
    if (!isLoading && !isError) {
      reset();
    }
  };

  const handelEdit = (e) => {
    e.preventDefault();
    dispatch(
      updateTransaction({ id: editing.id, name, type, amount: Number(amount) })
    );
    dispatch(editInActive());
    setIsEditMode(false);
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={!isEditMode ? handelCreate : handelEdit}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="My Salary"
            value={name}
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
          {isEditMode ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>
      {!isLoading && isError && <p className="error">An error occoured !</p>}

      {isEditMode && (
        <button onClick={handelCancelEdit} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
