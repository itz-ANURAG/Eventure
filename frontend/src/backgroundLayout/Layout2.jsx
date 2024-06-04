import React from 'react'
import bg from "../HarryPotter/bg6.webp"
function Layout2({children}) {
  return (
    <div style={{backgroundImage:`url(${bg})`,backgroundSize:'cover',backgroundAttachment:'fixed'}}>
      {children}
    </div>
  )
}

export default Layout2