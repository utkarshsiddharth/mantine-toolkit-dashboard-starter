import type { ColorScheme } from '@mantine/core'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout/Layout'
import { About, Home, NotFound } from '@/screens'

function App() {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </ColorSchemeProvider>
    </MantineProvider>
  )
}

export default App
