import React, { useEffect, useState } from 'react'
import { MDBBtnGroup, MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdb-react-ui-kit';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';

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
    await axios.get(`http://10.50.240.199:3000/remove_friend?curr_user_id=${user_id}&&frd_user_id=${frd_user_id}`);
    let users = sentFriend;
    users = users.reduce((accumulator, item) => {
      if (item.frd_user_id !== frd_user_id) {
        accumulator.push(item);
      }
      return accumulator;
    }, []);
    setsentFriend(users);
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
                  <MDBBtn style={{ widows: "100%", backgroundColor: "#771a7e" }} onClick={() => { removeFriend(user.user_id, item.frd_user_id) }}> Cancel  </MDBBtn>
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