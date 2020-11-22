module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "array-callback-return": [0, { allowImplicit: true }],
    "prefer-destructuring": ["error", {"object": false, "array": false}],
    "camelcase": [0, {"properties": "never"}],
    "import/prefer-default-export": "off",
    "max-len": [2, {"code": 120, "tabWidth": 4, "ignoreUrls": true}],
    "no-unused-vars": 1,
  },
};
