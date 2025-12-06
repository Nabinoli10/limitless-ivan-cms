import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { HeaderClient } from './HeaderClient'

export function Header({ data }: { data: HeaderType }) {
  return <HeaderClient data={data} />
}
