// theme.js
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const scaleFontSizes90 = {
  '2xs': '0.563rem',  // 0.625 * 0.9
  xs:   '0.675rem',   // 0.75  * 0.9
  sm:   '0.788rem',   // 0.875 * 0.9
  md:   '0.9rem',     // 1.00  * 0.9
  lg:   '1.013rem',   // 1.125 * 0.9
  xl:   '1.125rem',   // 1.25  * 0.9
  '2xl': '1.35rem',   // 1.50  * 0.9
  '3xl': '1.688rem',  // 1.875 * 0.9
  '4xl': '2.025rem',  // 2.25  * 0.9
  '5xl': '2.7rem',    // 3.00  * 0.9
  '6xl': '3.375rem',  // 3.75  * 0.9
  '7xl': '4.05rem',   // 4.5   * 0.9
  '8xl': '5.4rem',    // 6.0   * 0.9
  '9xl': '7.2rem',    // 8.0   * 0.9
};

export const system = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      tokens: {
        fonts: {
          heading: { value: "'Montserrat', sans-serif" },
          body:    { value: "'Montserrat', sans-serif" },
        },
        fontSizes: Object.fromEntries(
          Object.entries(scaleFontSizes90).map(([key, value]) => [
            key,
            { value },
          ])
        ),
      },
    },
  })
);
