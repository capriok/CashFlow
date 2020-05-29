import React from 'react'

import greetLogo from '../images/greet-logo.png'

import {
  User
} from '../interfaces/interfaces'
import {
  SetUser,
  FormEvent
} from '../types/types'

interface Props {
  user: User
  setUser: SetUser
}

const GreetBox: React.FC<Props> = ({ user, setUser }) => {
  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    if (user.name) {
      setUser({ ...user, isAuth: true })
      localStorage.setItem(`CF-user`, JSON.stringify({ ...user, isAuth: true }))
    }
  }
  return (
    <>
      <div className="greetbox">
        <img className="greet-logo" src={greetLogo} alt="" />
        <div className="inner-box">
          <h1>CashFlow</h1>
          <form onSubmit={(e: FormEvent) => submitForm(e)} >
            <div><input type="text" placeholder="Nickname" value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            /></div>
            <button type="submit">Proceed</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default GreetBox