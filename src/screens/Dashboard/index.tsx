import { Box, Flex, Grid, Paper, Stack, Title } from '@mantine/core'
import { IconBasket, IconCards } from '@tabler/icons'

import {
  RecentOrdersTable,
  StatsGrid,
  TransactionTable
} from '@/components/common'
import { RevenueStatCard, ViewStatBars } from '@/components/common/Cards'
import { RevenueChart } from '@/components/common/Charts'
import { viewStats, websiteViewsData } from '@/data/cards'
import { data } from '@/data/revenue'
import { statCards } from '@/utils/data'

function Home() {
  return (
    <div className="grid">
      <Stack ml="xl" mt="xl">
        <StatsGrid data={statCards} />
      </Stack>
      <div className="my-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="flex-[8]">
          <Stack>
            <Paper p="sm" ml="xl">
              <Title ml="xl">Best Selling Brands</Title>
            </Paper>
            <div className="h-[400px] w-full">
              <RevenueChart data={data} />
            </div>
          </Stack>
        </div>
        <div className="flex-[4]">
          <Stack mb="xl">
            <ViewStatBars data={viewStats} />
          </Stack>
          <Stack>
            <RevenueStatCard
              data={websiteViewsData}
              diff={844}
              total={'12,434'}
            />
          </Stack>
        </div>
      </div>
      <Grid>
        <Grid.Col sm={12} md={5} lg={5}>
          <Box aria-label="transactions" title="Transactions">
            <Paper p="xs">
              <Flex gap="md" align="center">
                <Title order={2}>Transaction History</Title>
                <IconCards />
              </Flex>
            </Paper>
            <TransactionTable />
          </Box>
        </Grid.Col>
        <Grid.Col sm={12} md={7} lg={7}>
          <Box h={100}>
            <Paper p="xs">
              <Flex gap="md" align="center">
                <Title order={2}>Recent Orders</Title>
                <IconBasket />
              </Flex>
            </Paper>
            <RecentOrdersTable />
          </Box>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default Home
