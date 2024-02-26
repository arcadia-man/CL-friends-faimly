import { MDBBtn, MDBBtnGroup, MDBContainer } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import FriendMember from './FriendMember'
import FriendPending from './FriendPending'
import FriendRequest from './FriendRequest'
import FriendSerch from './FriendSerch'

const Friends = () => {
  const [friendSatus, setfriendSatus] = useState({ isMember: true, isPending: false, isRequest: false, isSearch: false })
  function freindShow() { setfriendSatus({ isMember: true, isPending: false, isRequest: false, isSearch: false }) }
  function requestShow() { setfriendSatus({ isMember: false, isPending: true, isRequest: false, isSearch: false }) }
  function sentShow() { setfriendSatus({ isMember: false, isPending: false, isRequest: true, isSearch: false }) }
  function searchShow() { setfriendSatus({ isMember: false, isPending: false, isRequest: false, isSearch: true }) }
  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", minHeight: "100vh" }} className='pb-5'>
      <MDBContainer>
        <MDBBtnGroup className='mt-5' style={{ width: "100%", color: "black" }}>
          <MDBBtn style={friendSatus.isMember ? { backgroundColor: '#771a7e', color: "white" } : { backgroundColor: '#f3edf4', color: "black" }} onClick={freindShow}> Friends </MDBBtn>
          <MDBBtn style={friendSatus.isRequest ? { backgroundColor: '#771a7e', color: "white" } : { backgroundColor: '#f3edf4', color: "black" }} onClick={sentShow}> Request </MDBBtn>
          <MDBBtn style={friendSatus.isPending ? { backgroundColor: '#771a7e', color: "white" } : { backgroundColor: '#f3edf4', color: "black" }} onClick={requestShow}>  sent</MDBBtn>
          <MDBBtn style={friendSatus.isSearch ? { backgroundColor: '#771a7e', color: "white" } : { backgroundColor: '#f3edf4', color: "black" }} onClick={searchShow}>  Search </MDBBtn>
        </MDBBtnGroup>
        <br />
        {friendSatus.isMember && <FriendMember />}
        {friendSatus.isPending && <FriendPending />}
        {friendSatus.isRequest && <FriendRequest />}
        {friendSatus.isSearch && <FriendSerch />}
      </MDBContainer>
    </div>
  )
}

export default Friends