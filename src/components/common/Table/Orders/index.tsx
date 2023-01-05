import { Badge, CopyButton, Flex, Table, Text, Tooltip } from '@mantine/core'
import { IconCurrencyRupee } from '@tabler/icons'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'

import { getTransactionHistory } from '@/graphql/main'
import { server } from '@/utils/server'

type OrderElementType = {
  name: string
  status: string
  amount: number
  orderId: string
  transactionId?: string
  date: string
  paymentMode: 'online' | 'cod'
}

const fetchTransactions = async () => {
  const res = await server.post('/graphql', {
    query: getTransactionHistory
  })
  const { docs } = res.data.data.Orders
  const rows = docs.map((item: any) => {
    const { firstName } = item.user
    const orderId = item.id
    const { paymentMode } = item
    const transactionId = item.payment.orderCreationId
    const date = dayjs(item.createdAt).format('MMMM DD, YYYY')
    return {
      name: firstName,
      amount: item.orderAmount,
      orderId,
      status: item.orderStatus,
      date,
      transactionId,
      paymentMode
    }
  })
  return rows
}

export default function TransactionHistory() {
  const { data, isLoading, error } = useQuery(
    'order-history',
    fetchTransactions,
    {
      refetchOnWindowFocus: false
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error instanceof Error) {
    return <div>{error!.message}</div>
  }

  const rows = data.map((element: OrderElementType) => (
    <tr key={element.orderId}>
      <td>
        <Text weight={700} variant="gradient">
          {element.name}
        </Text>
      </td>
      <td>
        <CopyButton value={element.orderId}>
          {({ copied, copy }) => (
            <Tooltip
              color={copied ? 'teal' : 'blue'}
              label={`${copied ? 'Copied' : 'Copy'}: ${element.orderId}`}
            >
              <Text
                style={{ cursor: 'pointer' }}
                underline
                onClick={copy}
                color={copied ? 'teal' : 'blue'}
              >
                {`${element.orderId}`.slice(0, 10)}
              </Text>
            </Tooltip>
          )}
        </CopyButton>
      </td>
      <td>
        {element.transactionId ? (
          <CopyButton value={element.transactionId}>
            {({ copied, copy }) => (
              <Tooltip
                color={copied ? 'teal' : 'blue'}
                label={`${copied ? 'Copied' : 'Copy'}: ${
                  element.transactionId
                }`}
              >
                <Text
                  style={{ cursor: 'pointer' }}
                  underline
                  onClick={copy}
                  color={copied ? 'teal' : 'blue'}
                >
                  {`${element.transactionId}`.slice(0, 10)}
                </Text>
              </Tooltip>
            )}
          </CopyButton>
        ) : (
          <Text>-:-</Text>
        )}
      </td>
      <td>
        <Badge color={element.paymentMode === 'cod' ? 'grape' : 'yellow'}>
          {element.paymentMode}
        </Badge>
      </td>
      <td>
        <Flex align="center">
          <IconCurrencyRupee size={16} />
          <Text mb={1}>{element.amount}</Text>
        </Flex>
      </td>
      <td>
        <Badge color={'grape'}>{element.status}</Badge>
      </td>
      <td>{element.date}</td>
    </tr>
  ))

  return (
    <Table verticalSpacing="md" striped highlightOnHover withBorder>
      <thead>
        <tr>
          <th>Name</th>
          <th>OrderId</th>
          <th>TransactionId</th>
          <th>Payment Mode</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}
