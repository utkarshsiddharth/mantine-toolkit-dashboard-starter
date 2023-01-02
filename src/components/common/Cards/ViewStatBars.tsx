import {
  Center,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Text
} from '@mantine/core'
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons'

import type { StatsRingProps } from '@/types/component.types'

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight
}

export default function StatsRing({ data }: StatsRingProps) {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon]
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon size={22} stroke={1.5} />
              </Center>
            }
          />

          <div>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              {stat.label}
            </Text>
            <Text weight={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    )
  })
  return (
    <SimpleGrid cols={1} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {stats}
    </SimpleGrid>
  )
}
