import React, { useState } from 'react'

import { User, BudgetItem } from '../interfaces/interfaces'
import { SetBudgets } from '../types/types'

import banner from '../images/head-banner.jpg'
import card from '../images/head-cc.png'

import deletePNG from '../images/delete.png'

interface Props {
  user: User,
  budgets: BudgetItem[],
  setBudgets: SetBudgets
}

const AppHeader: React.FC<Props> = ({ user, budgets, setBudgets }) => {
  const [menuOpen, setMenu] = useState<boolean>(true)
  const [composing, setComposing] = useState<boolean>(false)
  const [budgetName, setBudgetName] = useState<string>('')

  const deleteBugdet = (index: number) => {
    let newBudgets = budgets.filter((b, i) => i !== index)
    setBudgets(newBudgets);
  }

  return (
    <header className="app-header">
      <p
        className={menuOpen ? 'menu-btn inv' : 'menu-btn'}
        onClick={() => setMenu(!menuOpen)}>☰</p>
      {menuOpen
        ? <div className="header-menu">
          <div className="budget-list">
            <h1>Choose Budget</h1>
            {composing &&
              <form id="budgetForm" onSubmit={e => {
                e.preventDefault()
                if (budgetName) {
                  setBudgets([...budgets, { isActive: false, name: budgetName }])
                  setBudgetName('')
                  setComposing(false)
                }
              }}>
                <input type="text" autoFocus
                  value={budgetName}
                  onChange={e => setBudgetName(e.target.value)}
                  className="composing-input"
                  placeholder="Budget Name"
                />
              </form>
            }
            {budgets.map((budget, i) => (
              <div className="item">
                <li>{budget.name}</li>
                <img src={deletePNG} alt=""
                  onClick={() => {
                    deleteBugdet(i)
                  }} />
              </div>
            ))}
          </div>
          <div className="compose-btns-cont">
            {composing
              ? <>
                <button className="compose-btn" form="budgetForm">Submit Budget</button>
                <div className="divider"></div>
                <p className="compose-btn" onClick={() => setComposing(!composing)}>Cancel</p>
              </>
              : <p className="compose-btn" onClick={() => setComposing(!composing)}>New Budget</p>
            }
          </div>
        </div>
        : <>
          <div className="banner">
            <img src={banner} alt="" />
          </div>
          <img className="cc" src={card} alt="" />
          <p className="username">{user.name}</p>
        </>
      }
    </header>
  )
}

export default AppHeader