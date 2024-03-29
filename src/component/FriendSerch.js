import React, { useState } from 'react'
import { MDBBtnGroup, MDBListGroup, MDBListGroupItem, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

const FriendSerch = () => {
  const [email, setEmail] = useState('');
  const [showEmail, setShowEmail] = useState([]);
  const { user } = useUserContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    setShowEmail(await friendsMembers(email, user.user_id));
  };

  const friendsMembers = async (email, user_id) => {
    try {
      const response = await axios.get(`http://10.50.240.199:3000/search_friend?email=${email}&&curr_user_id=${user_id}`);
      if (response.data.status === 400) {
        return [];
      }
      console.log(response.data)
      return [response.data.result]
    } catch (error) {

    }
  }

  const addFriend = async (user_id, frd_user_id) => {
    try {
      const response = await axios.get(`http://10.50.240.199:3000/add_friend?curr_user_id=${user_id}&&frd_user_id=${frd_user_id}&&status=pending`);
      if (response.data.status === 200) {
        let users = showEmail;
        users = users.map((item) => {
          if (item.user_id === frd_user_id) {
            return { ...item, status: 'Pending' }; 
          }
          return item;  
        });
        setShowEmail(users);
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <h4 className='mb-3 pt-3'>Friend Search</h4>
      <form className='d-flex input-group w-auto mb-3 pt-3' onSubmit={async (e) => (await handleSearch(e))}>
        <input type='email' className='form-control border-focus-color' placeholder="Friend Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label='Search' />
        <MDBBtn style={{ backgroundColor: "#771a7e" }} color='primary' >Search</MDBBtn>
      </form>
      <MDBListGroup style={{ minWidth: '22rem' }} dark>
        {
          showEmail.map((item) => {
            return (
              <MDBListGroupItem tag='button' key={item.user_id} action aria-current='true' type='button' className='px-3 d-flex justify-content-between'>
                <div>{item.email}</div>
                <div> <MDBBtnGroup shadow='0'>
                  <MDBBtn style={{ widows: "100%", backgroundColor: "#771a7e" }} onClick={() => addFriend(user.user_id, item.user_id)} disabled={(item.status === "" ? false : true)}> {(item.status === "") ? "Add Friend" : item.status}
                  </MDBBtn>
                </MDBBtnGroup> </div>
              </MDBListGroupItem>
            )
          })
        }
      </MDBListGroup>
    </div>
  )
}

export default FriendSerch
