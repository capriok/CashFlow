import React from 'react'

import banner from '../images/head-banner.jpg'
import card from '../images/head-cc.png'
import logout from '../images/logout.png'
import { User } from '../interfaces/interfaces'


interface Props {
  user: User
}

const Header: React.FC<Props> = ({ user }) => {
  return (
    <header className="header">
      <div className="banner">
        <img src={banner} alt="" />
      </div>
      <img className="cc" src={card} alt="" />
      <p className="username">{user.name}</p>
      <img className="logout" src={logout} alt="" onClick={() => {
        localStorage.removeItem('CF-user')
        window.location.href = '/'
      }} />
    </header>
  )
}

export default Header