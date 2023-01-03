import { Paper, Stack, Title } from '@mantine/core'

import { StatsGrid } from '@/components/common'
import { RevenueStatCard, ViewStatBars } from '@/components/common/Cards'
import { RevenueChart } from '@/components/common/Charts'
import { viewStats } from '@/data/cards'
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
              data={[
                {
                  color: '#47D6AB',
                  count: '2,824',
                  label: 'Mobile',
                  part: 70
                },
                {
                  color: '#333',
                  count: '1,200',
                  label: 'Tablet',
                  part: 30
                },
                {
                  color: '#333',
                  count: '1,200',
                  label: 'Desktop',
                  part: 30
                }
              ]}
              diff={844}
              total={'12,434'}
            />
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default Home
