import './index.css'

import { ThemeProvider } from '@material-tailwind/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
)
