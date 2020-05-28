import React from 'react'

export interface User {
  isAuth: boolean,
  name: string
}

export interface SheetItem {
  id: string,
  name: string,
  value: number
}

export interface Calculations {
  balence: number,
  income: number,
  expense: number
}

export interface IsComposing {
  income: boolean,
  expense: boolean
}

export interface NewItem {
  name: string,
  value: number | undefined
}

export interface Selection {
  incomes: SheetItem[],
  expenses: SheetItem[]
}