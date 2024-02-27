module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
      ],
      parser: "@typescript-eslint/parser",
    },
    {
      files: ["*.html"],
      plugins: ["@html-eslint"],
      extends: ["plugin:@html-eslint/recommended"],
      parser: "@html-eslint/parser",
      rules: {
        "@html-eslint/indent": "off",
        "@html-eslint/no-extra-spacing-attrs": "off",
        "@html-eslint/require-closing-tags": "off",
      },
    },
  ],
};
