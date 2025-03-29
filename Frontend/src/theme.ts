import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          500: { value: '#3182CE' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
