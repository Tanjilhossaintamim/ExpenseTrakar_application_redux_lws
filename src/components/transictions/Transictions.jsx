import { useDispatch, useSelector } from "react-redux";
import Transiction from "./Transiction";
import { useEffect } from "react";
import { fetchTransactions } from "../../redux/features/transictions/transactionSlice";

const Transictions = () => {
  const { isLoading, isError, transactions, error } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  let content;
  if (isLoading) content = <p>loading .....</p>;
  if (!isLoading && isError) content = <p className="error">{error}</p>;
  if (!isLoading && !isError && transactions.length == 0)
    content = <p>No Transaction</p>;
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map((transaction) => (
      <Transiction key={transaction.id} transaction={transaction} />
    ));
  }
  return (
    <div className="conatiner_of_list_of_transactions">
      <ul>{content}</ul>
    </div>
  );
};

export default Transictions;
