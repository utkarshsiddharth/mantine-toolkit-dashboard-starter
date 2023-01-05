import type { MantineColor, SelectItemProps } from '@mantine/core'
import { Autocomplete, Group, Text } from '@mantine/core'
import React, { forwardRef } from 'react'

import { server } from '@/utils/server'

interface ItemProps extends SelectItemProps {
  color: MantineColor
  description: string
  image: string
}

const OrderSearch = () => {
  const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ description, value, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text>{value}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  )
  const handleOrderSearch = async (query: string) => {
    const res = await server.get(`/orders/search/${query}`)
    return res.data
  }
  return (
    <Autocomplete
      styles={(theme) => ({
        root: {
          width: 400
        },
        input: {
          color: theme.colors.dark[8]
        }
      })}
      placeholder="Pick one"
      itemComponent={AutoCompleteItem}
      onChange={handleOrderSearch}
      data={[
        {
          label: 'Bender Bending Rodríguez',
          value: 'Blender Blending Rodriguez',
          description: 'Fascinated with cooking, though has no sense of taste'
        }
      ]}
    />
  )
}

export default OrderSearch
