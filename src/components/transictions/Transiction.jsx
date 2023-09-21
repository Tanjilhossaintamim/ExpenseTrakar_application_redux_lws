import EditImage from "../../assets/images/edit.svg";
import DeleteImage from "../../assets/images/delete.svg";
const Transiction = () => {
  return (
    <li className="transaction income">
      <p>Earned this month</p>
      <div className="right">
        <p>৳ 100</p>
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

export default Transiction;
