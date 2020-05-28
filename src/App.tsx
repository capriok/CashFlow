import React, { useState, useEffect } from 'react'

import short from 'short-uuid'

import GreetBox from './components/greet-box'
import Header from './components/header'
import SheetHead from './components/sheet-head'
import DataSheet from './components/data-sheet'
import ActionBox from './components/action-box'

import {
  User,
  SheetItem,
  IsComposing,
  NewItem,
  Calculations,
  Selection
} from './interfaces/interfaces'
import { FormEvent } from './types/types'

export const App: React.FC = () => {
  const [incomes, setIncomes] = useState<SheetItem[]>([])
  const [expenses, setExpenses] = useState<SheetItem[]>([])
  const [isDeleting, setDeleting] = useState<boolean>(false)
  const [user, setUser] = useState<User>({
    isAuth: false, name: ''
  })
  const [isComposing, setCompose] = useState<IsComposing>({
    income: false, expense: false
  })
  const [newItem, setNewItem] = useState<NewItem>({
    name: '', value: undefined
  })
  const [results, setResults] = useState<Calculations>({
    balence: 0,
    income: 0,
    expense: 0
  })
  const [selection, setSelection] = useState<Selection>({
    incomes: [],
    expenses: []
  })

  const isUser = localStorage.getItem(`CF-user`)
  const hasIncomes = localStorage.getItem(`CF-incomes$${user.name}`)
  const hasExpenses = localStorage.getItem(`CF-expenses$${user.name}`)
  useEffect(() => {
    isUser && setUser(JSON.parse(isUser))
    hasIncomes && setIncomes(JSON.parse(hasIncomes))
    hasExpenses && setExpenses(JSON.parse(hasExpenses))
  }, [user.isAuth])
  useEffect(() => {
    if (user.isAuth) {
      localStorage.setItem(`CF-incomes$${user.name}`, JSON.stringify(incomes))
      localStorage.setItem(`CF-expenses$${user.name}`, JSON.stringify(expenses))
    }
  }, [incomes, expenses])

  const composeType = (type: string): void => {
    if (type === 'income') {
      setCompose({ expense: false, income: !isComposing.income })
    } else if (type === 'expense') {
      setCompose({ income: false, expense: !isComposing.expense })
    }
  }

  const addType = (e: FormEvent): void => {
    e.preventDefault()
    let type: string = e.target.name
    let id = short.generate();
    let { name } = newItem
    let { value } = newItem
    if (!name || !value) return
    switch (type) {
      case 'income':
        setIncomes([
          ...incomes,
          { id, name, value }
        ])
        break;
      case 'expense':
        setExpenses([
          ...expenses,
          { id, name, value }
        ])
        break;
      default:
        break;
    }
    closeCompose()
  }

  const closeCompose = (): void => {
    setCompose({ income: false, expense: false })
    setNewItem({ name: '', value: 0 })
  }

  const toggleDeletion = (): void => {
    setDeleting(!isDeleting)
    setSelection({
      incomes: [],
      expenses: []
    })
  }


  const handleCheckbox = (type: string, item: SheetItem, i: number): void => {
    if (type === 'income') {
      setSelection({
        ...selection,
        incomes: [...selection.incomes, item]
      })
    } else if (type === 'expense') {
      setSelection({
        ...selection,
        expenses: [...selection.expenses, item]
      })
    }
  }

  const deleteSelection = (): void => {
    const incomeFilter = incomes.filter(({ id: id1 }) => {
      return !selection.incomes.some(({ id: id2 }) => {
        return id2 === id1
      })
    })
    const expenseFilter = expenses.filter(({ id: id1 }) => {
      return !selection.expenses.some(({ id: id2 }) => {
        return id2 === id1
      })
    })
    setIncomes(incomeFilter)
    setExpenses(expenseFilter)
    toggleDeletion()
  }

  const calculateResults = (): void => {
    let inVals = incomes.reduce((acc, cur) => acc + cur.value, 0)
    let exVals = expenses.reduce((acc, cur) => acc + cur.value, 0)
    setResults({
      balence: inVals - exVals,
      income: inVals,
      expense: exVals
    })
  }

  useEffect(() => {
    calculateResults()
  }, [incomes, expenses])

  return (
    <>
      <h1 className="notice">This is intented to be a mobile only application</h1>
      <div className="app">
        {!user.isAuth
          ? <GreetBox user={user} setUser={setUser} />
          : <>
            <Header user={user} />
            <SheetHead
              incomes={incomes}
              expenses={expenses}
              results={results}
              toggleDeletion={toggleDeletion}
            />
            <DataSheet
              incomes={incomes}
              expenses={expenses}
              results={results}
              newItem={newItem}
              setNewItem={setNewItem}
              isComposing={isComposing}
              setCompose={setCompose}
              isDeleting={isDeleting}
              handleCheckbox={handleCheckbox}
              addType={addType}
            />
            <ActionBox
              composeType={composeType}
              isComposing={isComposing}
              closeCompose={closeCompose}
              isDeleting={isDeleting}
              toggleDeletion={toggleDeletion}
              deleteSelection={deleteSelection}
            />
          </>
        }
      </div>
    </>
  )
}

export default App