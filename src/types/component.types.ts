/* eslint-disable prettier/prettier */
import type { icons } from '@/utils/data'

export type StatCardType = {
  title: string
  icon: keyof typeof icons
  value: string
  diff: number
}

export type StatItemType = {
  label: string
  stats: string
  progress: number
  color: string
  icon: 'up' | 'down'
}

export type StatsRingProps = {
  data: StatItemType[]
}

export type NavLinkItemType = {
  label: string
  link: string
}

export type NavLinkType = {
  label: string
  icon: any
  link?: string
  initiallyOpened?: boolean
  links?: NavLinkItemType[]
}

export type OrderRowType = {
  orderId: string
  user: string
  paymentMode: 'cod' | 'online'
  paymentId?: string
  orderAmount: number
  orderCurrency: 'INR'
  orderStatus: 'pending' | 'processing' | 'dispached' | 'arrived' | 'failed'
}
