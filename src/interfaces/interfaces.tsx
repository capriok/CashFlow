import React from 'react'

export interface SheetItem {
  id: number,
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