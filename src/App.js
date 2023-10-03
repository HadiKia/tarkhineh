import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./components/layout";
import HomePage from "./components/home/HomePage";
import Foods from "./components/menu/Foods";
import FoodDetails from "./components/menu/FoodDetails";
import ShopCart from "./components/shopping-cart/ShopCart";
import CompletionOfInformation from "./components/completion-of-information/CompletionOfInformation";
import Payment from "./components/payment/Payment";
import SuccessfulPayment from "./components/payment/SuccessfulPayment";
import SuccessfulOrder from "./components/payment/SuccessfulOrder";
import AboutUs from "./components/about-us/AboutUs";
import ContactUs from "./components/contact-us/ContactUs";
import FAQ from "./components/faq/FAQ";
import Rules from "./components/rules/Rules";

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
          <Route path="/successful-payment" element={<SuccessfulPayment />} />
          <Route path="/successful-order" element={<SuccessfulOrder />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </Layout>
    </Provider>
  );
};

export default App;
