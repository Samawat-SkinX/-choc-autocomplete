/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: true,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  proseWrap: "always", // printWidth line breaks in md/mdx
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  // import order plugin options
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrderCaseSensitive: true,
  importOrder: [
    // node built-in modules
    "<BUILTIN_MODULES>",
    // line break
    "",
    // Packages `react` and `next` related packages come first.
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    // Built-in and Third party
    "<THIRD_PARTY_MODULES>",
    // line break
    "",
    // Internal packages.
    "^@/(.*)$",
    // line break
    "",
    // Relative imports. Put `.` last.
    "^~/(.*)$",
    "^[./]",
  ],
};
