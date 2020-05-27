import React from 'react'
import { IsComposing } from '../interfaces/interfaces'
import { SetComposing } from '../types/types'

interface Props {
  composeType: (type: string) => void,
  isComposing: IsComposing,
  setCompose: SetComposing
}


const ActionBox: React.FC<Props> = ({ composeType, isComposing, setCompose }) => {
  return (
    <div className="actions">
      {!isComposing.income && !isComposing.expense
        ? <button onClick={() => { composeType('income') }}>Add Income</button>
        : isComposing.income
          ? <button form="incomeForm">Submit Income</button>
          : <button form="expenseForm">Submit Expense</button>
      }
      <div className="divider"></div>
      {!isComposing.income && !isComposing.expense
        ? <button onClick={() => { composeType('expense') }}>Add Expense</button>
        : <button onClick={() => { setCompose({ income: false, expense: false }) }}>Cancel</button>
      }

    </div >
  )
}

export default ActionBox
