import type { ColorScheme } from '@mantine/core'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout/Layout'
import {
  About,
  Dashboard,
  NotFound,
  Orders,
  Payments,
  ProductAnalytics,
  Users
} from '@/screens'
import { socketConnecting } from '@/store/slice/socketSlice'
import { server } from '@/utils/server'

function App() {
  // const socket = useSelector<RootState>((state) => state.socket) as InitialState

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(socketConnecting(''))
  }, [])
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  useEffect(() => {
    const login = async () => {
      await server.post(
        '/users/login',
        {
          email: 'crickart@gmail.com',
          password: '12345678'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
    }
    login()
  }, [])
  return (
    <MantineProvider
      theme={{ colorScheme, primaryColor: 'yellow' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <Router>
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/product/analytics" element={<ProductAnalytics />} />
              <Route path="/users" element={<About />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </ColorSchemeProvider>
    </MantineProvider>
  )
}

export default App
