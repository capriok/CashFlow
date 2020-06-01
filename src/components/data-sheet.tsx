import React from 'react'

import {
  SheetItem,
  IsComposing,
  NewItem,
  Calculations,
  BudgetData
} from '../interfaces/interfaces'
import {
  SetComposing,
  SetNewItem,
  FormEvent
} from '../types/types'

interface Props {
  activeBudget: BudgetData
  results: Calculations
  isComposing: IsComposing
  setCompose: SetComposing
  newItem: NewItem
  setNewItem: SetNewItem
  isDeleting: boolean
  handleCheckbox: (type: string, item: SheetItem) => void
  addType: (e: FormEvent) => void
}

const ValueSheet: React.FC<Props> = ({
  activeBudget,
  results,
  newItem,
  setNewItem,
  isComposing,
  isDeleting,
  handleCheckbox,
  addType }) => {

  return (
    <div className="data-sheet" onTouchStart={() => { }}>
      <section id="incomes">
        {(activeBudget.incomes.length > 0 || isComposing.income)
          && <div className="section-head">
            <p className="section-title">Incomes</p>
            <p><span>$ </span><span className="">{results.income.toFixed(2)}</span></p>
          </div>
        }
        {isComposing.income &&
          <div className="add-to-sheet">
            <form id="incomeForm" name="income" className="inputs"
              onSubmit={(e: FormEvent) => addType(e)}>
              <input type="text" placeholder="Name" value={newItem.name} autoFocus
                onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
              <input type="text" placeholder="Value" value={newItem.value}
                onChange={e => setNewItem({ ...newItem, value: parseInt(e.target.value) })} />
            </form>
          </div>
        }
        {activeBudget.incomes.map((item, i) => (
          <div className="item" key={i}>
            <p className="item-name">{item.name}</p>
            {isDeleting
              ? <label className="delete-checkbox">
                <input type="checkbox" onClick={() => handleCheckbox('income', item)} />
              </label>
              : <p><span>$ </span><span className="pos">{item.value.toFixed(2)}</span></p>
            }
          </div>
        ))}
      </section>
      <section id="expenses">
        {(activeBudget.expenses.length > 0 || isComposing.expense)
          && <div className="section-head">
            <p className="section-title">Expenses</p>
            <p><span>$ </span><span className="">{results.expense.toFixed(2)}</span></p>
          </div>
        }
        {isComposing.expense &&
          <div className="add-to-sheet">
            <form id="expenseForm" name="expense" className="inputs"
              onSubmit={(e: FormEvent) => addType(e)}>
              <input type="text" placeholder="Name" value={newItem.name} autoFocus
                onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
              <input type="number" placeholder="Value" value={newItem.value}
                onChange={e => setNewItem({ ...newItem, value: parseInt(e.target.value) })} />
            </form>
          </div>
        }
        {activeBudget.expenses.map((item, i) => (
          <div className="item" key={i}>
            <p className="item-name">{item.name}</p>
            {isDeleting
              ? <label className="delete-checkbox">
                <input type="checkbox" onClick={() => handleCheckbox('expense', item)} />
              </label>
              : <p><span>$ </span><span className="neg">{item.value.toFixed(2)}</span></p>
            }
          </div>
        ))}
      </section>
    </div >
  )
}

export default ValueSheet