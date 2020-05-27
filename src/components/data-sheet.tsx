import React from 'react'

import { SheetItem, IsComposing, NewItem, Calculations } from '../interfaces/interfaces'
import { SetComposing, SetNewItem, FormEvent } from '../types/types'

interface Props {
  incomes: SheetItem[],
  expenses: SheetItem[],
  results: Calculations,
  isComposing: IsComposing,
  setCompose: SetComposing;
  newItem: NewItem,
  setNewItem: SetNewItem,
  addType: (e: FormEvent) => void
}

const ValueSheet: React.FC<Props> = ({ incomes, expenses, results, newItem, setNewItem, isComposing, addType }) => {
  return (
    <div className="value-sheet" onTouchStart={() => { }}>
      <section id="incomes">
        {(incomes.length > 0 || isComposing.income)
          && <div className="section-head">
            <p className="section-title">Cash Flow</p>
            <p><span>$ </span><span className="">{results.income.toFixed(2)}</span></p>
          </div>
        }
        {isComposing.income &&
          <div className="add-to-sheet">
            <form id="incomeForm" name="income" className="inputs"
              onSubmit={(e: FormEvent) => addType(e)}>
              <input type="text" placeholder="Name" value={newItem.name} autoFocus
                onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
              <input type="number" placeholder="Value" value={newItem.value}
                onChange={e => setNewItem({ ...newItem, value: parseInt(e.target.value) })} />
            </form>
          </div>
        }
        {incomes.map((item, i) => (
          <div className="item" key={i}>
            <p className="item-name">{item.name}</p>
            <p><span>$ </span><span className="pos">{item.value.toFixed(2)}</span></p>
          </div>
        ))}
      </section>
      <section id="expenses">
        {(expenses.length > 0 || isComposing.expense)
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
        {expenses.map((item, i) => (
          <div className="item" key={i}>
            <p className="item-name">{item.name}</p>
            <p><span>$ </span><span className="neg">{item.value.toFixed(2)}</span></p>
          </div>
        ))}
      </section>
    </div >
  )
}

export default ValueSheet