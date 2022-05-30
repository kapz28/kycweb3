module.exports = {
  root: true,
  extends: ["@toruslabs/eslint-config-react"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 11,
    project: "./tsconfig.json",
  },
  rules: {
    "no-console": 2,
    "@typescript-eslint/no-throw-literal": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  env: {
    es2020: true,
    browser: true,
    node: true,
  },
};
