import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./components/layout";
import HomePage from "./components/home/HomePage";
import Foods from "./components/menu/Foods";
import FoodDetails from "./components/menu/FoodDetails";
import ShopCart from "./components/shopping-cart/ShopCart";
import CompletionOfInformation from "./components/completion-of-information/CompletionOfInformation";
import Payment from "./components/payment/Payment";

import ScrollToTop from "./components/helper/ScrollToTop";

// Redux
import store from "./components/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<Foods />} />
          <Route path="/menu/:slug" element={<FoodDetails />} />
          <Route path="/cart" element={<ShopCart />} />
          <Route path="/completion-of-information" element={<CompletionOfInformation />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </Layout>
    </Provider>
  );
};

export default App;
