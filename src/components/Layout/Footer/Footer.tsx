import { Footer, Paper, Text, UnstyledButton } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons'
import React from 'react'

import { COLORS } from '@/utils/constants'

const FooterBar = () => {
  return (
    <Footer height={60} p="md">
      <Paper>
        Copywright &copy; 2023,{' '}
        <IconBrandGithub style={{ display: 'inline' }} size={16} />{' '}
        <UnstyledButton>
          <Text
            variant="gradient"
            weight={600}
            component="a"
            target="_blank"
            href="https://github.com/shubhamwebdesign"
            gradient={{ from: COLORS.primary, to: COLORS.secondary }}
          >
            shubhamwebdesign
          </Text>
        </UnstyledButton>
      </Paper>
    </Footer>
  )
}

export default FooterBar
