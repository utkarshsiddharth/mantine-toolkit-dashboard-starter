import { ActionIcon, Group } from '@mantine/core'
import { IconBellRinging, IconListCheck, IconMessage } from '@tabler/icons'
import React from 'react'

const NavAction = () => {
  return (
    <Group spacing="lg">
      <ActionIcon title="Notifications" variant="outline">
        <IconBellRinging size={20} />
      </ActionIcon>
      <ActionIcon title="List" variant="outline">
        <IconListCheck size={20} />
      </ActionIcon>
      <ActionIcon title="Messages" variant="outline">
        <IconMessage size={18} />
      </ActionIcon>
    </Group>
  )
}

export default NavAction
