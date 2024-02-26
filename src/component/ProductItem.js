
import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBContainer
} from 'mdb-react-ui-kit';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProductItem = (props) => {
  const { item, event_type, event_from } = props;
  const [centredModal, setcentredModal] = useState(false);
  const toggleOpen = () => setcentredModal(!centredModal);
  const [wish, setwish] = useState(false);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const changeWish = async () => {
    if (user && user.status) {
      if (event_from === 'wishlist') {
        await event_type(user.user_id, item.product_id)
      } else if (event_from === 'pd_page') {
        await event_type(user.user_id, item.product_id, item.is_wishlist)
      }
    }else{
      navigate("/login");
    }
    // try {
    //   if (user && user.status) {
    //     if (item.is_wishlist === 1) {
    //       await removeWishlist(user.user_id, item.product_id)         
    //     } else {
    //       await addWishlist(user.user_id, item.product_id)
    //     }
    //     setwish(!wish)
    //   } else {
    //     navigate("/login");
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

  useEffect(() => {
    setwish(!wish)
  }, [item.is_wishlist])


  return (
    <div className="mt-3">
      <MDBCard >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <MDBCardImage src={item.product_img_url} position='top' alt='...' />
          <div onClick={changeWish} style={{ cursor: 'pointer', position: 'absolute', top: 10, right: 10 }} title={wish ? 'Remove from wishlist' : 'Add to wishlist'}>
            {item.is_wishlist ? <MDBIcon fas style={{ color: 'red' }} icon="heart" /> : <MDBIcon far icon="heart" />}
          </div>
        </div>
        <MDBCardBody>
          <MDBCardTitle>{item.product_name.length > 20 ? item.product_name.substring(0, 20) + '...' : item.product_name}</MDBCardTitle>
          <MDBBtn className="myBtnBg w-100 text-center" onClick={toggleOpen} style={{ backgroundColor: "#771a7e" }}>
            Show Details
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>

      <MDBModal open={centredModal} setOpen={setcentredModal} tabIndex='-1'>
        <MDBModalDialog size="lg" centered>
          <MDBModalContent>
            <div className='row'>
              <MDBContainer className='col-md-6 mt-2' >
                <img src={item.product_img_url} alt='Your Image' className='img-fluid' />
              </MDBContainer>
              <MDBContainer className='col-md-6'>
                <MDBModalHeader> <MDBModalTitle>{item.product_name}</MDBModalTitle><MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn> </MDBModalHeader>
                <MDBModalBody> {item.product_description}</MDBModalBody>
                <MDBModalHeader> <MDBModalTitle> Price: ₹{item.product_cost}</MDBModalTitle> </MDBModalHeader>
              </MDBContainer>
            </div>
            <MDBBtn className='m-3' onClick={changeWish} style={{ backgroundColor: "#771a7e", widows: "100%" }}>{item.is_wishlist ? "Remove" : "Add To Whislist"}</MDBBtn>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default ProductItem