import { useSelector } from "react-redux";
import thousendsSeparator from "../../utils/thousendSeparator";

const Balance = () => {
  const { transactions } = useSelector((state) => state.transaction);

  const calculate = () => {
    let balance = 0;
    transactions.forEach((transaction) => {
      if (transaction.type == "income") {
        balance += Number(transaction.amount);
      } else {
        balance -= Number(transaction.amount);
      }
    });

    return thousendsSeparator(balance);
  };

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span> <span>{calculate()}</span>
      </h3>
    </div>
  );
};

export default Balance;
