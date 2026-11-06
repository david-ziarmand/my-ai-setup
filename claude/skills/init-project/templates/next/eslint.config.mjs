import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import simpleImportSort from "eslint-plugin-simple-import-sort"

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [["^[a-z]", "^@payloadcms"], ["^@payload-config", "^@payload-types", "^@/"], ["^\\."]],
        },
      ],
      "simple-import-sort/exports": "warn",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^(_|ignore)",
        },
      ],
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["../../*"],
              message: "Use @/ alias instead of relative imports crossing multiple directories upward",
            },
            { group: ["src/*"], message: "Use @/ alias instead of bare src/ imports" },
          ],
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "src/app/(payload)/**"]),
])
