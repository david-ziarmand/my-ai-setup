# Code style

## General

1. Files and folders: lowercase kebab-case, `file-name.ts`.
2. Classes: PascalCase, `MyClassName`. Use classes only when truly needed.
3. Variables and functions: camelCase with full, declarative names.
4. Keep functions small with low cognitive complexity. If a file grows complex, split it into small functions and export only what is needed.
5. Never rename identifiers that are part of an external contract when applying naming rules: hook names, CMS field names, AJAX actions, request and meta keys, DB columns, third-party API fields.

## Comments

1. No comments unless the user asks or the "why" is not obvious. Comments are English only.
2. Every comment starts with a tag:
   - `TODO:` non-critical follow-up, one sentence max.
   - `INFO:` non-obvious fact, one sentence max.
   - `HACK:` workaround that is not clean but works, three sentences max.
3. Plain text only: no quotes, no dashes, no lists, no docblocks or multi-line narration.
4. Obvious or redundant comments get deleted, not shortened.
5. Exempt: tool directives (`eslint-disable`, `@ts-expect-error`) and generated files.

## TypeScript

1. Prefer `type` over `interface`. Use `interface` only when functions or methods are part of the shape.
2. Inline types with 5 keys or fewer.
3. Prefer arrow functions: `const myFunction = () => {}`.
4. Avoid `any`, use `unknown` or a proper type. Prefix intentionally unused vars with `_`.

## Imports

1. Inside one feature or one shared service, imports are relative, including one level up: `./file`, `../components/file`.
2. Anything that crosses a feature or service boundary uses the `@/` alias: `@/shared/...`, `@/features/other`.
3. Never deep-import another feature. Import it through its barrel: `@/features/hero`, not `@/features/hero/components/hero-section`.
4. ESLint `no-restricted-imports` flags `../../*` and bare `src/*`.

## Barrels

1. Barrel files: `index.tsx` for components (rarely hooks), `index.ts` for other logic.
2. A barrel exports only what something outside the feature actually imports. Internal-only pieces are imported directly by relative path.

## React and styling

1. Component variants use `cva()` from `class-variance-authority`, with `VariantProps<typeof variants>` for props.
2. Conditional classes use `cn()` (`clsx` + `tailwind-merge`), never template literals.

## Scripts

CLI scripts in `scripts/` are thin wrappers: load env, read `process.argv`, dynamically import a service from `src/shared/services/<name>/`, call it, handle `process.exit`. Business logic lives in the service.

## Prettier

Minimum setup for every JS/TS project. An existing project config wins over this one.

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": false,
  "semi": false,
  "trailingComma": "es5"
}
```
