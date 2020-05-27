import React from 'react'

import Header from './components/header'
import SheetHead from './components/sheet-head'
import DataSheet from './components/data-sheet'
import ActionBox from './components/action-box'

import headBanner from './images/head-banner.jpg'
import headCC from './images/head-cc.png'

import { SheetItem, IsComposing, NewItem, Calculations } from './interfaces/interfaces'
import { FormEvent } from './types/types'

export const App: React.FC = () => {
  const [isComposing, setCompose] = React.useState<IsComposing>({
    income: false, expense: false
  })
  const [newItem, setNewItem] = React.useState<NewItem>({
    name: '', value: undefined
  })
  const [incomes, setIncomes] = React.useState<SheetItem[]>([
    { id: 1, name: 'paycheck', value: 1400 }
  ])
  const [expenses, setExpenses] = React.useState<SheetItem[]>([
    { id: 1, name: 'rent', value: 600 },
  ])
  const [results, setResults] = React.useState<Calculations>({
    balence: 0,
    income: 0,
    expense: 0
  })

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
    let id = Math.ceil(Math.random() * 10000);
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
    setNewItem({ name: '', value: 0 })
    setCompose({ income: false, expense: false })
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

  React.useEffect(() => {
    calculateResults()
  }, [incomes, expenses])

  return (
    <div className="app">
      <Header banner={headBanner} card={headCC} />
      <SheetHead results={results} />
      <DataSheet
        incomes={incomes}
        expenses={expenses}
        results={results}
        newItem={newItem}
        setNewItem={setNewItem}
        isComposing={isComposing}
        setCompose={setCompose}
        addType={addType}
      />
      <ActionBox
        composeType={composeType}
        isComposing={isComposing}
        setCompose={setCompose}
      />
    </div>
  )
}

export default App