import React from 'react'
import { Calculations, SheetItem } from '../interfaces/interfaces'

interface Props {
  incomes: SheetItem[],
  expenses: SheetItem[],
  results: Calculations,
  toggleDeletion: () => void
}

const SheetHead: React.FC<Props> = ({ incomes, expenses, results, toggleDeletion }) => {
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
      {(incomes.length > 0 || expenses.length > 0) &&
        <p className="ham" onClick={() => toggleDeletion()}>☰</p>}
    </header>
  )
}

export default SheetHead