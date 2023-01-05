import {
  Button,
  Center,
  Chip,
  createStyles,
  Flex,
  Grid,
  Group,
  ScrollArea,
  Select,
  Table,
  Text,
  TextInput,
  Title,
  UnstyledButton
} from '@mantine/core'
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

import { OrderSearch } from '../Elements'

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

export default function OrderTable({ data }: TableSortProps) {
  const [search, setSearch] = useState('')
  const [paymentMode, setpaymentMode] = useState('')
  const [filteredData, setFilteredData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof OrderRowType | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  const setSorting = (field: keyof OrderRowType) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
  }

  const handleFilter = (value: string) => {
    setFilteredData(
      data.filter(
        (item: OrderRowType) =>
          item.user.toLowerCase().includes(value.toLowerCase()) ||
          item.orderId.includes(value) ||
          item.orderAmount.toString().includes(value)
      )
    )
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    if (value === '') {
      setFilteredData(data)
    }
    handleFilter(value)
  }
  const handlePaymentMode = (value: string) => {
    if (value === '') {
      setFilteredData(data)
      return
    }
    setFilteredData(
      data.filter(
        (item: OrderRowType) => item.paymentMode.toUpperCase() === value
      )
    )
    setpaymentMode(value)
  }

  const rows = filteredData.map((row) => (
    <tr key={row.orderId}>
      <td>
        <Text>{row.user}</Text>
      </td>
      <td>
        <Text underline>{row.orderId}</Text>
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
          placeholder="Pick one"
          nothingFound="No options"
          defaultValue={row.orderStatus}
          size="sm"
          styles={(theme) => ({
            input: {
              color: theme.colors.dark[8]
            }
          })}
          data={orderStatus}
        />
      </td>
    </tr>
  ))

  return (
    <>
      <Grid align="baseline" justify={'center'}>
        <Grid.Col span={2}>
          <Title order={2}>Orders</Title>
        </Grid.Col>
        <Grid.Col span={'auto'}>
          <Flex justify="end">
            <OrderSearch />
          </Flex>
        </Grid.Col>
        <Grid.Col span={3}>
          <Chip.Group
            value={paymentMode}
            onChange={handlePaymentMode}
            spacing="sm"
            mb="lg"
          >
            <Chip value="ONLINE">ONLINE</Chip>
            <Chip value="COD">COD</Chip>
            <Chip value="">All</Chip>
          </Chip.Group>
        </Grid.Col>
      </Grid>
      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          value={search}
          onChange={handleSearchChange}
          styles={(theme) => ({
            input: {
              color: theme.colors.dark[8]
            }
          })}
        />
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: 'fixed', minWidth: 700 }}
        >
          <thead>
            <tr>
              <th>User</th>
              <th>OrderId</th>
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
    </>
  )
}
