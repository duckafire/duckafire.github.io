module.exports = {
  env: {
    browser: true,
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 18,
    sourceType: "script",
  },
  rules: {
    "no-unused-vars": ["warn", { args: "none", vars: "all" }],
    "no-console": "off",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", "tab"]
  }
};
