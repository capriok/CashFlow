import React, { useState } from 'react'

import short from 'short-uuid'

import logout from '../images/logout.png'

import {
  User,
  BudgetItem,
  BudgetData
} from '../interfaces/interfaces'
import {
  SetUser,
  SetBudgets,
  SetActiveBudget,
  FormEvent
} from '../types/types'

import banner from '../images/head-banner.jpg'
import card from '../images/head-cc.png'
import deletePNG from '../images/delete.png'


interface Props {
  user: User
  setUser: SetUser
  budgets: BudgetItem[]
  activeBudget: BudgetData
  setActiveBudget: SetActiveBudget
  setBudgets: SetBudgets
  handlebudgetSelect: (i: number) => void
}

const AppHeader: React.FC<Props> = ({
  user,
  budgets,
  activeBudget,
  setActiveBudget,
  setBudgets,
  handlebudgetSelect }) => {

  const [menuOpen, setMenu] = useState<boolean>(false)
  const [composing, setComposing] = useState<boolean>(false)
  const [budgetName, setBudgetName] = useState<string>('')

  const deleteBugdet = (index: number) => {
    let newBudgets = budgets.filter((b, i) => {
      return i !== index
    })
    setBudgets(newBudgets);
    let indexofactive = budgets.findIndex(o => {
      return o.name === activeBudget.name
    })
    if (index === indexofactive) {
      setActiveBudget({
        name: '',
        incomes: [],
        expenses: []
      })
      localStorage.removeItem(`CF-active$${user.name}`)
    }
  }

  const handleForm = (e: FormEvent) => {
    e.preventDefault()
    let id = short.generate();

    let isDupe = false
    budgets.forEach(({ name }) => {
      if (name === budgetName) {
        return isDupe = true
      }
    })

    if (budgetName && !isDupe) {
      setBudgets([
        ...budgets, {
          isActive: false,
          id: id,
          name: budgetName,
          data: {
            name: budgetName,
            incomes: [],
            expenses: []
          }
        }])
      setBudgetName('')
      setComposing(false)
    }
  }

  return (
    <header className="app-header">
      <p className={menuOpen ? 'menu-btn inv' : 'menu-btn'}
        onClick={() => setMenu(!menuOpen)}>☰</p>
      {menuOpen
        ? <div className="header-menu">
          <div className="budget-list">
            <h1>Choose Budget</h1>
            {composing &&
              <form id="budgetForm" onSubmit={(e: FormEvent) => { handleForm(e) }}>
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
                <li onClick={() => handlebudgetSelect(i)}>{budget.name}</li>
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
                <button className="menu-btn" form="budgetForm">Create Budget</button>
                <div className="divider"></div>
                <p className="menu-btn" onClick={() => setComposing(!composing)}>Cancel</p>
              </>
              :
              <>
                <p className="menu-btn" onClick={() => setComposing(!composing)}>New Budget</p>
                <div className="divider"></div>
                <p className="menu-active-text">Active: {activeBudget.name}</p>
              </>
            }
          </div>
        </div>
        : <>
          <img className="logout" src={logout} alt="" onClick={() => {
            localStorage.removeItem('CF-user')
            window.location.href = '/'
          }} />
          <div className="banner">
            <img src={banner} alt="" />
          </div>
          <img className="cc" src={card} alt="" />
          <p className="username" >{user.name}</p>
        </>
      }
    </header>
  )
}

export default AppHeader