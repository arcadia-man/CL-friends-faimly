import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../context/UserContext';

const Signout = () => {
  const { logOut, user, getProduct } = useUserContext();
  const navigate = useNavigate()

  useEffect(() =>{
    if (user && user.status) {
      logOut();
      getProduct();
      navigate("/product");
    }
    else {
      console.log("something went wrong!")
    }
    return () => {
      console.log("changed")
    }
  }, [])

  return (<div></div>)
}

export default Signout