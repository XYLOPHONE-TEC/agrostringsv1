import React from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { system } from './theme'

import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById('root')
if (!container) {
  console.error('Failed to find the root element')
} else {
  const root = createRoot(container) // new React 18 root API :contentReference[oaicite:3]{index=3}
  root.render(
    <React.StrictMode>
      <ChakraProvider value={system}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </React.StrictMode>
  )
}
