import { User, IsComposing, NewItem, BudgetItem } from '../interfaces/interfaces';
import { Dispatch } from 'react';

export type InputEvent = React.ChangeEvent<HTMLInputElement>
export type FormEvent = React.ChangeEvent<HTMLFormElement>

export type SetComposing = Dispatch<IsComposing>
export type SetNewItem = Dispatch<NewItem>
export type SetUser = Dispatch<User>
export type SetBudgets = Dispatch<BudgetItem[]>