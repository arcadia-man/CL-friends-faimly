import React from "react";
import { MDBFooter, MDBContainer, MDBBtn, MDBIcon } from "mdb-react-ui-kit";

export default function Footer() {
  
  return (
    <div className="pt-3" style={{ backgroundColor: "#f1dff2" }}>
      <MDBFooter className="text-center text-white">
        <MDBContainer className="p-4 pb-0">
          <section className="mb-4">
            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "#3b5998" }}
              href="https://www.facebook.com/caratlane/"
            >
              <MDBIcon fab icon="facebook-f" size="lg" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "#55acee" }}
              href="https://twitter.com/caratlane?lang=en"
            >
              <MDBIcon fab icon="twitter" size="lg" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "#ac2bac" }}
              href="https://www.instagram.com/caratlane/?hl=en"
            >
              <MDBIcon fab icon="instagram" size="lg" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "#ac2bac" }}
              href="https://in.linkedin.com/company/caratlane-trading-pvt--ltd"
            >
              <MDBIcon fab icon="linkedin" size="lg" />
            </MDBBtn>


            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "#ac2bac" }}
              href="https://www.caratlane.com/"
            >
              <MDBIcon fas icon="mobile-alt" size="lg" />
            </MDBBtn>

          </section>
        </MDBContainer>
        <br style={{ color: "white", width: "100%" }} />
        <div
          className="text-center p-3"
          style={{ backgroundColor: "#771a7e" }}
        >
          © 2022 Copyright: caratlane.com
        </div>
      </MDBFooter>
    </div>
  );
}
