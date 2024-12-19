import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import restrictUseAuth from "./eslint-rules/restrict-use-auth.js";
import validateExpandProp from "./eslint-rules/validate-expand-prop.js";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "custom-rules": {
        rules: {
          "restrict-use-auth": restrictUseAuth,
          "validate-expand-prop": validateExpandProp,
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "custom-rules/restrict-use-auth": ["error"],
      "custom-rules/validate-expand-prop": ["error"],
    },
  }
);
