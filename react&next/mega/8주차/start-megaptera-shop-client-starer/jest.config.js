module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    "<rootDir>/src/setupTests.ts",
  ],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            jsx: true,
            decorators: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
      },
    ],
  },
};
