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
  return (
    <div className="conatiner_of_list_of_transactions">
      <ul>
        {isLoading ? (
          <p>loading....</p>
        ) : (
          transactions.map((transaction) => (
            <Transiction key={transaction.id} transaction={transaction} />
          ))
        )}
        {!isLoading && isError && <p>{error}</p>}
      </ul>
    </div>
  );
};

export default Transictions;
