import Balance from "./components/balance/Balance";
import Footer from "./components/footer/Footer";
import Form from "./components/form/Form";
import Header from "./components/header/Header";
import Transictions from "./components/transictions/Transictions";

function App() {
  return (
    <div className="App">
      <Header />

      <div className="main">
        <div className="container">
          <Balance />

          <Form />

          <p className="second_heading">Your Transactions:</p>

          <Transictions />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
