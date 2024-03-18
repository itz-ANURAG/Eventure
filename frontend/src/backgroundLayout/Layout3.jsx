import React from 'react'
import bg from "../HarryPotter/bg2.jpg"
function Layout3({children}) {
  return (
    <div style={{backgroundImage:`url(${bg})`,backgroundSize:'cover',backgroundAttachment:'fixed'}}>
      {children}
    </div>
  )
}

export default Layout3