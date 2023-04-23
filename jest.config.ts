import nextJest from 'next/jest';
import { defaults } from 'jest-config';

const config = nextJest({ dir: './' });

const customConfig = {
  verbose: true,
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.ts'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$']
};

export default config(customConfig);
