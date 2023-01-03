import type { OrderRowType } from '@/types/component.types'

/* eslint-disable prettier/prettier */
export const data: OrderRowType[] = [
  {
    orderId: '#234424',
    user: 'Little - Rippin',
    paymentMode: 'online',
    orderAmount: 2000,
    orderCurrency: 'INR',
    orderStatus: 'processing',
    paymentId: '#3451_3nga34'
  },
  {
    orderId: '#63sg4424',
    user: 'Sanjeetc - Kumar',
    paymentMode: 'online',
    orderAmount: 2000,
    orderCurrency: 'INR',
    orderStatus: 'dispached',
    paymentId: '#3451_3nga34'
  },
  {
    orderId: '#833ff88a',
    user: 'Sanjeev Mishra',
    paymentMode: 'cod',
    orderAmount: 2000,
    orderCurrency: 'INR',
    orderStatus: 'failed'
  }
]
