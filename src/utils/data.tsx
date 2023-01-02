import {
  IconBasket,
  IconCoin,
  IconDiscount2,
  IconReceipt2,
  IconStars,
  IconUserPlus
} from '@tabler/icons'

import type { StatCardType } from '@/types/component.types'

export const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
  sales: IconBasket,
  order: IconStars
}

export const statCards: StatCardType[] = [
  {
    diff: 10,
    icon: 'user',
    title: 'User',
    value: 'user'
  },
  {
    diff: 31,
    icon: 'order',
    title: 'Orders',
    value: '1,312'
  },
  {
    diff: 12,
    icon: 'sales',
    title: 'Sales',
    value: '2,800'
  },
  {
    diff: 7,
    icon: 'sales',
    title: 'Refunded',
    value: '400'
  }
]
