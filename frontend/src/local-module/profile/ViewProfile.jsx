// view profile jsx in my profile section
import React from 'react'
import '../../stylesheets/ViewProfile.css'
import userImage from '../../photos/harry-potter.gif'
import Spinner from ".././Spinner"

function ViewProfile({
  username,
  email,
  fullName
}) {
 
  return (
    <>
    {

      username && email ?
    <div>
    <div className='container '>
    <div className='user-profile-card '>
    <div className='gradient bg-gradient-to-br from-red-950 to-black '></div>
    <div className="user-info-container  border-4 border-black bg-gradient-to-t from-red-300 to-black">
      <div className='imageOfUser'><img className='user-image justify-center' src={userImage} alt="user"/></div>
      <div className='user-name text-center whiltespace-wrap p-3 text-black'>{username}</div>
      <div className='user-description text-black'>{fullName}</div>
      <div className='email text-black'>Email ID:{email}</div>
    </div>
    </div>
    </div>
    </div>
    :
    <><h1><Spinner/></h1></>
    }
    </> 
  )
}
export default ViewProfile
