import React, { useEffect, useState } from 'react'
import { MDBBtnGroup, MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const FriendRequest = () => {
  const [showEmail, setShowEmail] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    friendsMembers(user.user_id)
  }, [])

  const friendsMembers = async (user_id) => {
    const response = await axios.get(`http://10.50.240.199:3000/requested_friends?curr_user_id=${user_id}`);
    console.log(response.data.result)
    setShowEmail(response.data.result)
  }

  const acceptFriend = async (user_id, frd_user_id) => {
    const response = await axios.get(`http://10.50.240.199:3000/accept_request?curr_user_id=${user_id}&&frd_user_id=${frd_user_id}&&status=accepted`);
    console.log(response.data)
  }

  const removeFriend = async (user_id, frd_user_id) => {
    const response = await axios.get(`http://10.50.240.199:3000/remove_friend?curr_user_id=${user_id}&&frd_user_id=${frd_user_id}`);
  }

  return (
    <div>
      <h4 className='mb-3 pt-3'>Friend Request</h4>
      <MDBListGroup style={{ minWidth: '22rem' }} dark>
        {showEmail.length > 0 ?
          showEmail.map((item) => {
            return (
              <MDBListGroupItem tag='button' key={item.frd_user_id} action aria-current='true' type='button' className='px-3 d-flex justify-content-between'>
                <div>{item.frd_email}</div>
                <div>  <MDBBtnGroup shadow='0'>
                  <MDBBtn color='primary' onClick={() => { acceptFriend(user.user_id, item.frd_user_id) }}> Confirm  </MDBBtn>
                  <MDBBtn color='warning' onClick={() => { removeFriend(user.user_id, item.frd_user_id) }}> Delete  </MDBBtn>
                </MDBBtnGroup>
                </div>
              </MDBListGroupItem>
            )
          }) : (
            <MDBListGroupItem tag='button' action aria-current='true' type='button' className='px-3 d-flex justify-content-between'>
              <div>No Pending Request</div>
            </MDBListGroupItem>
          )
        }
      </MDBListGroup>
    </div>
  )
}
export default FriendRequest