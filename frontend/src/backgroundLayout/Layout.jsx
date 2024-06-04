import React from 'react'
import bg from "../HarryPotter/bg.jpg"
function Layout({children}) {
  return (
    <div style={{backgroundImage:`url(${bg})`,backgroundSize:'cover',backgroundAttachment:'fixed'}}>
      {children}
    </div>
  )
}

export default Layout