interface User {
  isAuth: boolean
  name: string
}

interface BudgetItem {
  id: string
  name: string
  isActive: boolean
  data: BudgetData
}

interface BudgetData {
  name: string
  incomes: SheetItem[]
  expenses: SheetItem[]
}

interface SheetItem {
  id: string
  name: string
  value: number
}

interface Calculations {
  balence: number
  income: number
  expense: number
}

interface IsComposing {
  income: boolean
  expense: boolean
}

interface NewItem {
  name: string
  value: number | undefined
}

interface ItemSelection {
  incomes: SheetItem[]
  expenses: SheetItem[]
}

interface BudgetDeletion {
  item: number | undefined
  state: boolean
}

type InputEvent = React.ChangeEvent<HTMLInputElement>
type FormEvent = React.ChangeEvent<HTMLFormElement>

type SetComposing = React.Dispatch<IsComposing>
type SetNewItem = React.Dispatch<NewItem>
type SetUser = React.Dispatch<User>
type SetBudgets = React.Dispatch<BudgetItem[]>
type SetActiveBudget = React.Dispatch<BudgetData>