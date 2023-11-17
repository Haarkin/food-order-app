import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CardContextProvider } from "./store/CardContext";
import { UserProgressProviderContext } from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressProviderContext>
      <CardContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CardContextProvider>
    </UserProgressProviderContext>
  );
}

export default App;
