import React from 'react'
import bg from "../HarryPotter/bg7.jpg"
function Layout4({children}) {
  return (
    <div style={{backgroundImage:`url(${bg})`,backgroundSize:'cover',backgroundAttachment:'fixed'}}>
      {children}
    </div>
  )
}
export default Layout4