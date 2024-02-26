import React, { useEffect, useState } from "react";
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../context/UserContext';


export default function Login() {
  const [state, setstate] = useState({ email: "", password: "" });
  const { logIn, user, getProduct } = useUserContext();
  const navigate = useNavigate()
  const { email, password } = state;
  const handlechange = (e) => {
    let { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };


  const Handlesubmit = (e) => {
    e.preventDefault();
    if (!password || !email) {
      return;
    }
    logIn(email, password);
  };

  useEffect(() => {
    console.log(user && user.status)
    if (user && user.status) {
      console.log("I came here")
      getProduct();
      navigate("/product");
    }
    else {
      navigate("/login");
    }
    return () => {
      console.log("changed")
    }
  }, [user])

  return (
    <div  style={{ backgroundColor: "#f3edf4", minHeight: "100vh" }}>
      <MDBContainer className="d-flex justify-content-center">
        <form style={{ width: "23rem" }} onSubmit={Handlesubmit}>
          <h2 className="text-center my-3 myElement"><MDBIcon fas icon="user-circle" color="dark" className="fa-2x my-2"></MDBIcon> <br /> Login In</h2>
          <MDBInput label="Email" id="email formWhite" type="email" size="lg" name="email" value={state.email} onChange={handlechange} className="bg-light" required /><br />
          <MDBInput label="Password" id="pass formWhite" type="password" size="lg" name="password" minLength={5} value={state.password} onChange={handlechange} className="bg-light" required /><br />
          <MDBBtn disabled={false} active style={{backgroundColor: "#771a7e"}} type="submit" > Sign In </MDBBtn>
        </form>
      </MDBContainer>
    </div>
  );
}
