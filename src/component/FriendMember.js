import React, { useEffect, useState } from 'react'
import {
  MDBBtnGroup, MDBListGroup, MDBListGroupItem, MDBBtn, MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBContainer,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

const FriendMember = () => {
  const [showEmail, setShowEmail] = useState([]);
  const [scrollableModal, setScrollableModal] = useState(false);
  const { user,getProduct } = useUserContext();
  const [friendWishList, setfriendWishList] = useState([])

  useEffect(() => {
    friendsMembers(user.user_id)
  }, [])


  const friendsMembers = async (userId) => {
    const response = await axios.get(`http://10.50.240.199:3000/list_friends?curr_user_id=${userId}`);
    console.log(response.data.result)
    setShowEmail(response.data.result)
  }

  const removeFriend = async (user_id, frd_user_id) => {
    const response = await axios.get(`http://10.50.240.199:3000/remove_friend?curr_user_id=${user_id}&&frd_user_id=${frd_user_id}`);
  }


  const showFriendsWishList = async(frd_user_id) => {
    setScrollableModal(!scrollableModal);
    const response = await axios.get(`http://10.50.240.199:3000/list_product?user_id=${frd_user_id}&&is_wishlist_call=${true}`);
    setfriendWishList(response.data.result)
  }

  return (
    <div>
      <h4 className='mb-3 pt-3'>Friend</h4>
      <MDBListGroup style={{ minWidth: '22rem' }} dark>
        {showEmail.length > 0 ?
          showEmail.map((item) => {
            return (
              <MDBListGroupItem tag='button' key={item.user_id} action aria-current='true' type='button' className='px-3 d-flex justify-content-between'>
                <div>{item.frd_email}</div><div>{item.name}</div>
                <div>
                  <MDBBtnGroup shadow='0'>
                    <MDBBtn color='info' onClick={() => showFriendsWishList(item.frd_user_id)}> Wish </MDBBtn>
                    <MDBBtn color='warning' onClick={() => removeFriend(user.user_id, item.frd_user_id)}> Remove </MDBBtn>
                  </MDBBtnGroup> </div>
              </MDBListGroupItem>
            )
          }) : (
            <MDBListGroupItem tag='button' action aria-current='true' type='button' className='px-3 d-flex justify-content-between'>
              <div>No Pending Request</div>
            </MDBListGroupItem>
          )
        }
      </MDBListGroup>

      <MDBModal open={scrollableModal} setOpen={setScrollableModal} tabIndex='-1'>
        <MDBModalDialog size="lg" centered scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Wishlist</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setScrollableModal(!scrollableModal)} ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {
                friendWishList.map((item) => (
                  <div className='row'>
                    <MDBContainer className='col-md-6 mt-2' >
                      <img src={item.product_img_url} alt='Your Image' className='img-fluid' />
                    </MDBContainer>
                    <MDBContainer className='col-md-6'>
                      <MDBModalHeader>
                        <MDBModalTitle>{item.product_name}</MDBModalTitle>
                      </MDBModalHeader>
                      <MDBModalBody> {item.product_description}</MDBModalBody>
                      <MDBModalHeader>
                        <MDBModalTitle> Price: ₹{item.product_cost}</MDBModalTitle>
                        <MDBBtn className='m-3' style={{ widows: "100%" }} color="dark">{"Add To Your Whislist"}</MDBBtn>
                      </MDBModalHeader>
                    </MDBContainer>
                  </div>
                ))
              }
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default FriendMember