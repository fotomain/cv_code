

// npm install @faker-js/faker --save-dev
import { faker } from '@faker-js/faker'
import React, {useRef} from "react";
import {ColumnDef} from "@tanstack/react-table";
import {ProductListItem} from "../../../../system_state/products_state/models";

export type TTableLineStatuss = 'published' | 'draft'

export interface  TTableLine extends ProductListItem {
  // entity_guid: string
  // name: string
  // regular_price: number
  // sale_price: number
  // status: TTableLineStatuss
  // editedRows?:boolean
  filterFn?:(p:any)=>void
  filterFns?:(p:any)=>void
  subRows?: TTableLine[]
  // refGlobal?: any
  // refGlobal?: { [index: string]: any }[]
  row_expand_subnode?: boolean
  table_entity_all_data?:TTableLine[]
  table_entity_all_setData?:(new_data:TTableLine[])=>void
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): TTableLine => {
  return {
    id: (Math.random()*100).toString(),
    entity_guid: faker.person.firstName(),
    name: faker.person.lastName(),
    regular_price: faker.number.int(40).toString(),
    sale_price: faker.number.int(1000).toString(),
    status: 'published',
  }
}

export function table_types(...lens: number[]) {
  const makeDataLevel = (depth = 0): TTableLine[] => {
    const len = lens[depth]!
    return range(len).map((d): TTableLine => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}



