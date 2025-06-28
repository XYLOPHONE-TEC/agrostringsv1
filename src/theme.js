import { createSystem, defaultConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Montserrat', sans-serif" },
        body:    { value: "'Montserrat', sans-serif" },
      },
    },
  },
})
