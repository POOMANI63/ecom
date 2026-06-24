  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Signup from "./pages/Register/Signup";
  import Login from "./pages/Register/Login";
  import Home from "./pages/Home/Home";
  import Products from "./pages/Products/Products";
  import ProductAdd from "./pages/Admin/Productadd";
  import ProductDetails from "./pages/Products/Productdetails";
  import Cart from "./pages/cart/cart";
  import Header from "./components/common/Header";
  import OrderSuccess from "./pages/orders/OrderSuccess";
import Orders from "./pages/orders/Orders";
import About from "./pages/About/About";
import CategorySalesChart from "./pages/Charts/CategorySalesChart";

  export default function App() {
    return (
      <>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Pages with Header */}
            <Route path="/home" element={<><Header /><Home /></>} />
            <Route path="/products" element={<><Header /><Products /></>} />
            <Route path="/product/:id" element={<><Header /><ProductDetails /></>} />
            <Route path="/cart" element={<><Header /><Cart /></>} />

            <Route
              path="/order-success"
              element={<OrderSuccess />}
            />
            <Route path='/orders' element={<><Header/><Orders/></>}/>


            {/* {about} */}

            <Route path='/about' element={<><Header/><About/></>}/>

            {/* Admin */}
            <Route path="/addproducts" element={<><Header /><ProductAdd /></>} />

            {/* Charts */}
            <Route path='/pie' element={<><Header/><CategorySalesChart/></>}/>
          </Routes>

        </BrowserRouter>

        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }