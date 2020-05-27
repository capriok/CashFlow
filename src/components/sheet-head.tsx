import React from 'react'
import { Calculations } from '../interfaces/interfaces'

interface Props {
  results: Calculations
}

const SheetHead: React.FC<Props> = ({ results }) => {
  const calculateBalence = (): string => {
    const bal = results.balence
    return bal === 0 ? 'neut' : bal > 0 ? 'pos' : 'neg'
  }
  return (
    <header className="sheet-head">
      <p>Balence: $ <span className={calculateBalence()}>{results.balence.toFixed(2)}</span></p>
    </header>
  )
}

export default SheetHead