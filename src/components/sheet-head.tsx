import React from 'react'
import { Calculations, SheetItem, BudgetData } from '../interfaces/interfaces'

import remove from '../images/remove.png'

interface Props {
  activeBudget: BudgetData,
  results: Calculations,
  toggleDeletion: () => void
}

const SheetHead: React.FC<Props> = ({ activeBudget, results, toggleDeletion }) => {
  const calculateBalence = (): string => {
    return results.balence === 0
      ? 'neut'
      : results.balence > 0
        ? 'pos'
        : 'neg'
  }
  return (
    <header className="sheet-head">
      <p>Balence: $ <span className={calculateBalence()}>{results.balence.toFixed(2)}</span></p>
      {(activeBudget.incomes.length > 0 || activeBudget.expenses.length > 0) &&
        <img src={remove} alt="" className="delete" onClick={() => toggleDeletion()} />}
    </header>
  )
}

export default SheetHead