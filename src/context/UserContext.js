import React, { createContext, useContext, useId, useState } from 'react';
import axios from "axios";

const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState();
  const [product, setProduct] = useState([]);
  const [color, setColor] = useState({

  })
  const logIn = async (email, password) => {
    try {
      const response = await axios.get(`http://10.50.240.199:3000/login?email=${email}&&password=${password}`);
      if (response.data.status === 200) {
        const data = response.data;
        setUser({ status: true, user: data.user_name, user_id: data.user_id });
        const userData = JSON.stringify({ email: email, password: password });
        localStorage.setItem("hackthon", userData);
      }
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  const logOut = () => {
    setUser();
    localStorage.removeItem("hackthon");
  };

  const checkUserInLocal = async () => {
    const userData = localStorage.getItem("hackthon");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        await logIn(parsedUserData.email, parsedUserData.password)
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
        return null;
      }
    }
  }

  // Product

  const getProduct = async (user_id = 0, is_wishlist_call = false) => {
    try {
      const response = await axios.get(`http://10.50.240.199:3000/list_product?user_id=${user_id}&&is_wishlist_call=${is_wishlist_call}`);
      setProduct(response.data.result)
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  const addWishlist = async (userId, productId) => {
    try {
      const response = await axios.get(`http://10.50.240.199:3000/add_wishlist?user_id=${userId}&&product_id=${productId}`);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  }

  const removeWishlist = async (userId, productId) => {
    try {
      const response = await axios.get(`http://10.50.240.199:3000/remove_wishlist?user_id=${userId}&&product_id=${productId}`);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  }

  const getSent = async (user_id) => {
    try {
      const response = await axios.get(`http://10.50.240.199:3000/sent_request?curr_user_id=${user_id}`);
      return response.data.result
    } catch (error) {
      console.error("Error making API request:", error);
    }

  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      logIn,
      getProduct,
      product,
      setProduct,
      checkUserInLocal,
      removeWishlist,
      logOut,
      addWishlist,
      getSent
    }}>{props.children}</UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
}