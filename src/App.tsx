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
  const [budgets, setBudgets] = useState<BudgetItem[]>([])
  const [activeBudget, setActiveBudget] = useState<BudgetData>({
    name: '',
    incomes: [],
    expenses: []
  })
  // const [incomes, setIncomes] = useState<SheetItem[]>([])
  // const [expenses, setExpenses] = useState<SheetItem[]>([])
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

  ////////////////////////////////////////
  //    LOCALSTORAGE SETTERS    ////////////////////////////////////////
  ////////////////////////////////////////

  const isUser = localStorage.getItem(`CF-user`)
  const hasBudgets = localStorage.getItem(`CF-budgets$${user.name}`)
  const hasActive = localStorage.getItem(`CF-active$${user.name}`)

  useEffect(() => {
    isUser && setUser(JSON.parse(isUser))
    hasBudgets && setBudgets(JSON.parse(hasBudgets))
    hasActive && setActiveBudget(JSON.parse(hasActive))
  }, [user.isAuth])

  useEffect(() => {
    if (user.isAuth) {
      localStorage.setItem(`CF-budgets$${user.name}`, JSON.stringify(budgets))
    }
  }, [budgets])

  useEffect(() => {
    if (user.isAuth && activeBudget.name !== '') {
      localStorage.setItem(`CF-active$${user.name}`, JSON.stringify(activeBudget))
    }
  }, [activeBudget])

  ////////////////////////////////////////
  //    MAIN FUNCTIONS    ////////////////////////////////////////
  ////////////////////////////////////////

  const composeType = (type: string): void => {
    if (budgets.length === 0) {
      alert('Create a budget first')
      return
    } else {
      if (type === 'income') {
        setCompose({ expense: false, income: !isComposing.income })
      } else if (type === 'expense') {
        setCompose({ income: false, expense: !isComposing.expense })
      }
    }
  }

  const addType = (e: FormEvent): void => {
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

    // let allInc = [...activeBudget.incomes]
    // let allExp = [...activeBudget.expenses]
    // let data = {
    //   name: activeBudget.name,
    //   incomes: allInc,
    //   expenses: allExp
    // }

    // let indexofactive = budgets.findIndex(o => o.name === activeBudget.name)
    // let injectData = budgets[indexofactive].data = data
    // let updatedBudget: BudgetItem = {
    //   isActive: true,
    //   name: activeBudget.name,
    //   data: injectData
    // }

    // setBudgets([
    //   ...budgets,
    //   updatedBudget
    // ])
  }

  useEffect(() => {
    if (user.isAuth && activeBudget.name !== '') {
      let indexofactive = budgets.findIndex(o => o.name === activeBudget.name)
      console.log(indexofactive);
      let filteredBudgets = budgets.filter(budget => budget.name !== activeBudget.name)
      let updatedBudgetData = budgets[indexofactive].data = activeBudget
      let updatedBudget = {
        isActive: false,
        name: activeBudget.name,
        data: updatedBudgetData
      }
      setBudgets([
        ...filteredBudgets,
        updatedBudget
      ])
    }
  }, [activeBudget])

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
    setActiveBudget({ ...activeBudget, incomes: incomeFilter })
    setActiveBudget({ ...activeBudget, expenses: expenseFilter })
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
              budgets={budgets}
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