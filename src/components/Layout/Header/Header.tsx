import {
  Burger,
  Header,
  MediaQuery,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import React from 'react'

import EcommHub from '@/assets/ecommhub.svg'
import { ToggleButton } from '@/components/common'

import NavAction from '../NavAction/NavAction'

type HeaderBarType = {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderBar: React.FC<HeaderBarType> = ({ opened, setOpened }) => {
  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()
  return (
    <Header
      height={60}
      p="xs"
      display="flex"
      style={{ justifyContent: 'space-between', alignItems: 'center' }}
    >
      <img
        style={{
          mixBlendMode: colorScheme === 'light' ? 'darken' : 'exclusion'
        }}
        src={EcommHub}
      />
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          size="sm"
          color={theme.colors.gray[7]}
          mx="xl"
        />
      </MediaQuery>
      <div className="mr-6 hidden w-full justify-end md:flex">
        <NavAction />
      </div>

      <div className="hidden md:block">
        <ToggleButton />
      </div>
    </Header>
  )
}

export default HeaderBar
