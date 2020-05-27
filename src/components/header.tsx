import React from 'react'

interface Props {
  banner: string,
  card: string
}

const Header: React.FC<Props> = ({ banner, card }) => {
  return (
    <header className="header">
      <div className="banner">
        <img src={banner} alt="" />
      </div>
      <img className="cc" src={card} alt="" />
    </header>
  )
}

export default Header