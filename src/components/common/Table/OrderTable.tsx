import {
  Button,
  Center,
  createStyles,
  Group,
  ScrollArea,
  Select,
  Table,
  Text,
  TextInput,
  UnstyledButton
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconChevronDown,
  IconChevronUp,
  IconCurrencyRupee,
  IconSelector
} from '@tabler/icons'
import { useState } from 'react'

import { orderStatus } from '@/data/common'
import type { OrderRowType } from '@/types/component.types'
import { COLORS } from '@/utils/constants'

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important'
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    }
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21
  }
}))

interface TableSortProps {
  data: OrderRowType[]
}

interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles()
  // eslint-disable-next-line no-nested-ternary
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

function filterData(data: OrderRowType[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) =>
      item ? item[key].toLowerCase().includes(query) : item
    )
  )
}

function sortData(
  data: OrderRowType[],
  payload: {
    sortBy: keyof OrderRowType | null
    reversed: boolean
    search: string
  }
) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy])
      }

      return a[sortBy].localeCompare(b[sortBy])
    }),
    payload.search
  )
}

export default function OrderTable({ data }: TableSortProps) {
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof OrderRowType | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  const setSorting = (field: keyof OrderRowType) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }

  const rows = sortedData.map((row) => (
    <tr key={row.orderId}>
      <td>
        <Text underline>{row.orderId}</Text>
      </td>
      <td>
        <Text>{row.user}</Text>
      </td>
      <td>{row.orderAmount}</td>
      <td>
        <Button
          className="pointer-events-none"
          variant="default"
          leftIcon={<IconCurrencyRupee size={14} />}
        >
          <Text size="xs">{row.orderCurrency}</Text>
        </Button>
      </td>
      <td>
        <Button
          fullWidth
          mr="lg"
          styles={{
            root: {
              color:
                row.paymentMode === 'cod' ? COLORS.primary : COLORS.secondary,
              borderColor:
                row.paymentMode === 'cod' ? COLORS.primary : COLORS.secondary
            }
          }}
          className="pointer-events-none"
          variant={'outline'}
        >
          <Text size="xs">{row.paymentMode}</Text>
        </Button>
      </td>
      <td>{row?.paymentId ? <Text underline>{row.paymentId}</Text> : '-:-'}</td>
      <td>
        <Select
          clearable
          placeholder="Pick one"
          nothingFound="No options"
          defaultValue={row.orderStatus}
          data={orderStatus}
        />
      </td>
    </tr>
  ))

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            <th>UserId</th>
            <th>User</th>
            <Th
              sorted={sortBy === 'orderAmount'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('orderAmount')}
            >
              Order Amount
            </Th>
            <th>Order Currency</th>
            <th>Payment Mode</th>
            <th>Payment ID</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
