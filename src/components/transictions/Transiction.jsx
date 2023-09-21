import EditImage from "../../assets/images/edit.svg";
import DeleteImage from "../../assets/images/delete.svg";
import PropTypes from "prop-types";

const Transiction = ({ transaction }) => {
  const { name, amount } = transaction;
  return (
    <li className="transaction income">
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button className="link">
          <img className="icon" src={EditImage} />
        </button>
        <button className="link">
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
