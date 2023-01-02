import { Stack, Title } from '@mantine/core'
import React from 'react'

import { ToggleButton } from '@/components/common'

import Navbar from './Navbar/Navbar'

type LayoutType = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutType> = ({ children }) => {
  return (
    <div className="relative flex">
      <div className="fixed top-0">
        <Navbar />
      </div>
      <div className="m-8 ml-[100px] flex-1">
        <div className="flex items-center justify-between">
          <Stack ml="xl" spacing="xs">
            <Title order={2}>EcommHub</Title>
            <p>Your Online Shopping Destination, Now</p>
          </Stack>
          <ToggleButton />
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Layout
