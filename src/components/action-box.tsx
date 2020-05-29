import React from 'react'
import { IsComposing } from '../interfaces/interfaces'

interface Props {
  composeType: (type: string) => void
  isComposing: IsComposing
  isDeleting: boolean
  closeCompose: () => void
  toggleDeletion: () => void
  deleteSelection: () => void
}

const ActionBox: React.FC<Props> = ({
  composeType,
  isComposing,
  isDeleting,
  closeCompose,
  toggleDeletion,
  deleteSelection }) => {

  return (
    <div className="action-box">
      {isDeleting
        ? <>
          <button onClick={() => deleteSelection()}>Delete Selection</button>
          <div className="divider"></div>
          <button onClick={() => toggleDeletion()}>Cancel</button>
        </>
        : <>
          {!isComposing.income && !isComposing.expense
            ? <button onClick={() => composeType('income')}>Add Income</button>
            : isComposing.income
              ? <button form="incomeForm">Submit Income</button>
              : <button form="expenseForm">Submit Expense</button>
          }
          <div className="divider"></div>
          {!isComposing.income && !isComposing.expense
            ? <button onClick={() => composeType('expense')}>Add Expense</button>
            : <button onClick={() => closeCompose()}>Cancel</button>
          }
        </>
      }
    </div>
  )
}

export default ActionBox