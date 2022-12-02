import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import TotalBox from "./components/TotalBox";
import Loading from "./components/Loading";
import {useGlobalContext} from "./context/context"
import CartItem from "./components/CartItem";

function App() {

  const {isLoading, products} = useGlobalContext()
  if(isLoading) {
    return (
      <div className="App">
        <Navbar />
        <div className="center-item">
          <Loading />
        </div>
      </div>
    );
  }
  return(
    <div className="App">
      <Navbar />
      {products.length > 0 ? (
        <Cart /> 
      ) : (
        <div className="center-item">
          <h4>Nessun prodotto nel carrello</h4>
        </div>
      )}
      <TotalBox />
    </div>
  );
}

export default App;