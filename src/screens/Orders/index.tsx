import { Paper } from '@mantine/core'
import React from 'react'

import { OrderTable } from '@/components/common'
import { data } from '@/data/orderTable'

function Orders() {
  return (
    <Paper p="sm">
      <OrderTable data={data} />
    </Paper>
  )
}

export default Orders
