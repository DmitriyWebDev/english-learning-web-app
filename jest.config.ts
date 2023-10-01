import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/scripts/jest-setup-files/jest-setup.ts'],
  collectCoverage: false,
  setupFiles: ['jest-canvas-mock'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', '/vendor', '/__snapshots'],
  transformIgnorePatterns: ['/node_modules/(?!ol).+\\.js$'],
  globals: {
    FRONTEND_APP_VERSION: '0.0.0.jest',
  },
  moduleDirectories: ['node_modules'],
  snapshotSerializers: ['jest-serializer-html-string'],
  collectCoverageFrom: [
    '<rootDir>/**/*.{ts,tsx}',
    '!<rootDir>/**/constants/**',
    '!<rootDir>/**/__stories__/**',
    '!<rootDir>/**/storybook/**',
    '!<rootDir>/**/types/**',
  ],
  testMatch: [`<rootDir>/**/__tests__/**/*.{ts,tsx}`, `<rootDir>/**/*(*.)(spec|test).{ts,tsx}`],
  moduleFileExtensions: ['web.js', 'js', 'json', 'web.jsx', 'jsx', 'node', 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|ts|tsx)$': ['ts-jest', { isolatedModules: true }],
  },
};

export default config;
