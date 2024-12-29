module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/api.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  globals: {

  },
  transform: {
    '^.+\\.ts$': [
        'ts-jest',
        {isolatedModules: true}
    ]
  },
};
