import React, { useState, useEffect } from 'react'

import short from 'short-uuid'

import GreetBox from './components/greet-box'
import AppHeader from './components/app-header'
import SheetHead from './components/sheet-head'
import DataSheet from './components/data-sheet'
import ActionBox from './components/action-box'

import {
  User,
  BudgetItem,
  BudgetData,
  SheetItem,
  IsComposing,
  NewItem,
  Calculations,
  Selection
} from './interfaces/interfaces'
import { FormEvent } from './types/types'

export const App: React.FC = () => {
  const [user, setUser] = useState<User>({
    isAuth: false, name: ''
  })
  const [budgets, setBudgets] = useState<BudgetItem[]>([])
  const [isDeleting, setDeleting] = useState<boolean>(false)
  const [activeBudget, setActiveBudget] = useState<BudgetData>({
    name: '',
    incomes: [],
    expenses: []
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

  ////////////////////////////////////////
  //    LOCALSTORAGE SETTERS    ////////////////////////////////////////
  ////////////////////////////////////////

  const isUser = localStorage.getItem(`CF-user`)
  const hasBudgets = localStorage.getItem(`CF-budgets$${user.name}`)
  const hasActive = localStorage.getItem(`CF-active$${user.name}`)

  useEffect(() => {
    isUser && setUser(JSON.parse(isUser))
    user.isAuth && console.log('User -> ', user.name);
    hasBudgets && setBudgets(JSON.parse(hasBudgets))
    hasActive && setActiveBudget(JSON.parse(hasActive))
  }, [user.isAuth])

  useEffect(() => {
    if (user.isAuth) {
      localStorage.setItem(`CF-budgets$${user.name}`, JSON.stringify(budgets))
      console.log('All Budgets', budgets);
    }
  }, [budgets])

  useEffect(() => {
    if (user.isAuth && activeBudget.name !== '') {
      localStorage.setItem(`CF-active$${user.name}`, JSON.stringify(activeBudget))
      console.log('Active Budget', activeBudget);
    }
  }, [activeBudget])

  ////////////////////////////////////////
  //    MAIN FUNCTIONS    ////////////////////////////////////////
  ////////////////////////////////////////

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

  const composeSheetType = (type: string): void => {
    if (budgets.length === 0) {
      alert('Select a budget first')
      return
    } else {
      if (type === 'income') {
        setCompose({ expense: false, income: !isComposing.income })
      } else if (type === 'expense') {
        setCompose({ income: false, expense: !isComposing.expense })
      }
    }
  }

  const addToDataSheet = (e: FormEvent): void => {
    e.preventDefault()
    let type: string = e.target.name
    let id = short.generate();
    let { name } = newItem
    let { value } = newItem
    if (!name || !value) return
    let sheetItem = { id, name, value }
    switch (type) {
      case 'income':
        setActiveBudget({
          ...activeBudget,
          incomes: [
            ...activeBudget.incomes,
            sheetItem
          ]
        })
        break;
      case 'expense':
        setActiveBudget({
          ...activeBudget,
          expenses: [
            ...activeBudget.expenses,
            sheetItem
          ]
        })
        break;
      default:
        break;
    }
    closeCompose()
  }

  const handleCheckbox = (type: string, item: SheetItem): void => {
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
    const incomeFilter = activeBudget.incomes.filter(({ id: id1 }) => {
      return !selection.incomes.some(({ id: id2 }) => {
        return id2 === id1
      })
    })
    const expenseFilter = activeBudget.expenses.filter(({ id: id1 }) => {
      return !selection.expenses.some(({ id: id2 }) => {
        return id2 === id1
      })
    })
    setActiveBudget({ ...activeBudget, incomes: incomeFilter, expenses: expenseFilter })
    toggleDeletion()
  }

  const calculateResults = (): void => {
    let inVals = activeBudget.incomes.reduce((acc, cur) => acc + cur.value, 0)
    let exVals = activeBudget.expenses.reduce((acc, cur) => acc + cur.value, 0)
    setResults({
      balence: inVals - exVals,
      income: inVals,
      expense: exVals
    })
  }

  const handlebudgetSelect = (index: number): void => {
    let newBudgets = budgets
    newBudgets.forEach((b, i) => {
      budgets[i].isActive = false
      if (index === i) {
        budgets[index].isActive = true
      }
    })
    setBudgets(newBudgets)
    budgets.forEach(obj => {
      if (obj.isActive) {
        setActiveBudget(obj.data)
      }
    });
  }

  useEffect(() => {
    if (user.isAuth && activeBudget.name !== '' && budgets.length > 0) {
      let indexofactive = budgets.findIndex(o => {
        return o.name === activeBudget.name
      })
      let budgetArray = budgets
      let updatedBudgetData = budgetArray[indexofactive].data = activeBudget
      let updatedBudget = {
        ...budgetArray[indexofactive],
        data: updatedBudgetData
      }
      budgetArray.splice(indexofactive, 1, updatedBudget)
      setBudgets(budgetArray)
    }
  }, [activeBudget])


  ////////////////////////////////////////
  //    ACTIONS ON CHANGES    ////////////////////////////////////////
  ////////////////////////////////////////

  useEffect(() => {
    calculateResults()
  }, [activeBudget.incomes, activeBudget.expenses])

  return (
    <>
      <h1 className="notice">This is intented to be a mobile only application</h1>
      <div className="app">
        {!user.isAuth
          ? <GreetBox user={user} setUser={setUser} />
          : <>
            <AppHeader
              user={user}
              setUser={setUser}
              budgets={budgets}
              activeBudget={activeBudget}
              setActiveBudget={setActiveBudget}
              setBudgets={setBudgets}
              handlebudgetSelect={handlebudgetSelect} />
            <SheetHead
              activeBudget={activeBudget}
              results={results}
              toggleDeletion={toggleDeletion}
            />
            <DataSheet
              activeBudget={activeBudget}
              results={results}
              newItem={newItem}
              setNewItem={setNewItem}
              isComposing={isComposing}
              setCompose={setCompose}
              isDeleting={isDeleting}
              handleCheckbox={handleCheckbox}
              addType={addToDataSheet}
            />
            <ActionBox
              composeType={composeSheetType}
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