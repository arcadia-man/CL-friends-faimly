import React, { useEffect, useState } from 'react'
import { MDBBtnGroup, MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdb-react-ui-kit';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const FriendPending = () => {
  const { user, getSent } = useUserContext();
  const [sentFriend, setsentFriend] = useState([])

  useEffect(() => {
    setFriend()
  }, [])

  async function setFriend() {
    setsentFriend(await getSent(user.user_id))
  }

  const removeFriend = async (user_id, frd_user_id) => {
    const response = await axios.get(`http://10.50.240.199:3000/remove_friend?curr_user_id=${user_id}&&frd_user_id=${frd_user_id}`);
  }

  return (
    <div>
      <h4 className='mb-3 pt-3'>Friend Sent</h4>
      {
        sentFriend.map((item) => (
          <MDBListGroup style={{ minWidth: '22rem' }} light>
            <MDBListGroupItem tag='button' action aria-current='true' type='button' className='px-3 d-flex justify-content-between'>
              <div>{item.frd_email} </div>
              <div>
                <MDBBtnGroup shadow='0'>
                  <MDBBtn color='warning' onClick={() => { removeFriend(user.user_id, item.frd_user_id) }}> Cancel  </MDBBtn>
                </MDBBtnGroup>
              </div>
            </MDBListGroupItem>
          </MDBListGroup>
        ))
      }

    </div>
  )
}

export default FriendPending