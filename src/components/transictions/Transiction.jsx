import EditImage from "../../assets/images/edit.svg";
import DeleteImage from "../../assets/images/delete.svg";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  editActive,
  removeTransaction,
} from "../../redux/features/transictions/transactionSlice";
import thousendsSeparator from "../../utils/thousendSeparator";

const Transiction = ({ transaction }) => {
  const dispatch = useDispatch();
  const { id, name, amount, type } = transaction || {};
  const deleteTransaction = () => {
    dispatch(removeTransaction(id));
  };
  const handelEdit = () => {
    dispatch(editActive(transaction));
  };
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {thousendsSeparator(amount)}</p>
        <button className="link" onClick={handelEdit}>
          <img className="icon" src={EditImage} />
        </button>
        <button onClick={deleteTransaction} className="link">
          <img className="icon" src={DeleteImage} />
        </button>
      </div>
    </li>
  );
};
Transiction.propTypes = {
  transaction: PropTypes.object,
};

export default Transiction;
