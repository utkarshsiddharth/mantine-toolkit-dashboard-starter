/* eslint-disable no-underscore-dangle */
import { Group, Stack, Text, TextInput } from '@mantine/core'
import { useState } from 'react'

import { server } from '@/utils/server'

interface ItemProps {
  label: string
  value: string
  description: string
  name: string
}

const OrderSearch = () => {
  const [orderEl, setOrderEl] = useState([])
  const [orderSearchInput, setOrderSearchInput] = useState('')
  const handleOrderSearch = async (query: string) => {
    setOrderSearchInput(query)
    if (!query) {
      setOrderEl([])
      return
    }

    const res = await server.get(`/orders/search/${query}`)
    const { data } = res
    if (data.length) {
      const items = data.map((item: any) => {
        return {
          label: item._id,
          value: item._id,
          name: `${item.user.firstName} ${item.user.lastName}`,
          description: item.shippingDetails.note
        }
      })
      setOrderEl(items)
    }
  }
  return (
    <div className="relative">
      <TextInput
        styles={(theme) => ({
          input: {
            color: theme.colors.dark[8]
          }
        })}
        value={orderSearchInput}
        placeholder="Search Order"
        onChange={(e) => handleOrderSearch(e.target.value)}
      />
      {orderEl.length ? (
        <div className="absolute top-9 z-10 w-full bg-gray-500 p-2">
          <Stack spacing="xs">
            {orderEl.map((item: ItemProps) => (
              <Group
                className="cursor-pointer"
                bg="gray"
                p="sm"
                key={item.value}
                noWrap
                onClick={() => {
                  setOrderEl([])
                  setOrderSearchInput(item.name)
                }}
              >
                <div>
                  <Text>{item.name}</Text>
                  <Text size="xs" color="dimmed">
                    {JSON.stringify(item.description)}
                  </Text>
                </div>
              </Group>
            ))}
          </Stack>
        </div>
      ) : null}
    </div>
  )
}

export default OrderSearch
