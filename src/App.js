import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer";
import ProductPage from "./component/ProductPage";
import Friends from "./component/Friends";
import Signout from "./component/Signout";
import { useUserContext } from "./context/UserContext";
import Whislist from "./component/Whislist";

function App() {
  const { user, checkUserInLocal , getProduct} = useUserContext();

  async function checkUserInLoca(){
    await checkUserInLocal();
  }
  useEffect(() => {
    checkUserInLoca();
  }, [])

  return (
    <div>
      <BrowserRouter >
        <ToastContainer />
        <Navbar />
        <div style={{ minHeight: "100vh" }}>
          <Routes>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/product" element={<ProductPage />}></Route>
            <Route exact path="/logout" element={<Signout />}></Route>
            <Route exact path="/" element={<ProductPage />}></Route>
            <Route exact path="/friend" element={(user && user.status) ? <Friends /> : <Navigate to="/login" />} />
            <Route exact path="/wishlist" element={(user && user.status) ? <Whislist /> : <Navigate to="/login" />} />
          </Routes></div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
