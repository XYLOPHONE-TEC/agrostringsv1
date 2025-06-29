// theme.js
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

export const system = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      tokens: {
        fonts: {
          heading: { value: "'Montserrat', sans-serif" },
          body:    { value: "'Montserrat', sans-serif" },
        },
      },
    },
  })
)
