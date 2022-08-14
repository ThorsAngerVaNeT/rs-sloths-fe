/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    "@vue/eslint-config-airbnb-with-typescript"
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  }
}
