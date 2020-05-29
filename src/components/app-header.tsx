import React, { useState } from 'react'

import short from 'short-uuid'

import { User, BudgetItem, BudgetData } from '../interfaces/interfaces'
import { SetBudgets, FormEvent } from '../types/types'

import banner from '../images/head-banner.jpg'
import card from '../images/head-cc.png'
import deletePNG from '../images/delete.png'


interface Props {
  user: User
  budgets: BudgetItem[]
  activeBudget: BudgetData
  setBudgets: SetBudgets
  handlebudgetSelect: (i: number) => void
}

const AppHeader: React.FC<Props> = ({
  user,
  budgets,
  activeBudget,
  setBudgets,
  handlebudgetSelect }) => {

  const [menuOpen, setMenu] = useState<boolean>(true)
  const [composing, setComposing] = useState<boolean>(false)
  const [budgetName, setBudgetName] = useState<string>('')

  const deleteBugdet = (index: number) => {
    let newBudgets = budgets.filter((b, i) => i !== index)
    setBudgets(newBudgets);
  }

  const handleForm = (e: FormEvent) => {
    e.preventDefault()
    let id = short.generate();
    if (budgetName) {
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
      <p
        className={menuOpen ? 'menu-btn inv' : 'menu-btn'}
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
                <p className="menu-p">Active: {activeBudget.name}</p>
              </>
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