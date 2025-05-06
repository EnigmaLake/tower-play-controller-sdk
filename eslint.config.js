import * as typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import * as importPlugin from "eslint-plugin-import";
import * as reactHooksPlugin from "eslint-plugin-react-hooks";
import * as reactPlugin from "eslint-plugin-react";
import * as promisePlugin from "eslint-plugin-promise";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      import: importPlugin,
      "react-hooks": reactHooksPlugin,
      react: reactPlugin,
      promise: promisePlugin,
    },
    rules: {
      "import/no-unresolved": "off",
      "import/no-named-as-default": "off",

      "import/no-cycle": ["error", { maxDepth: 3, ignoreExternal: true }],
      "import/no-extraneous-dependencies": ["error"],

      "import/named": "off",

      "no-console": ["warn", { allow: ["info", "warn", "error"] }],
      "react-hooks/exhaustive-deps": ["error"],
      "no-unused-vars": "off",
      "no-nested-ternary": ["error"],
      "@typescript-eslint/no-restricted-imports": ["error"],
      "@typescript-eslint/prefer-nullish-coalescing": ["error"],
      "no-unneeded-ternary": ["error"],
      "prefer-object-spread": ["warn"],
      "valid-typeof": ["error"],
      "no-useless-rename": ["error"],
      curly: ["error", "all"],
      "object-shorthand": ["warn"],

      "require-atomic-updates": ["warn"],
      "guard-for-in": ["warn"],
      eqeqeq: ["warn"],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-shadow": ["error"],

      "@typescript-eslint/no-inferrable-types": ["off"],
      "@typescript-eslint/no-explicit-any": ["error"],
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/await-thenable": "error",
    },
    ignores: ["dist/**", "node_modules/**", ".rollup.cache/**", "webpack.config.js"],
  },
];
