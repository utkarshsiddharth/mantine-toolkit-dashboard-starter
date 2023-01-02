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
