import { defineConfig, globalIgnores } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Icon-map lookups (`const Icon = getIcon(name)`) resolve to stable,
      // module-scoped component references — not a fresh component per render.
      "react-hooks/static-components": "off",
      // Flags the standard next-themes hydration-guard (`useEffect(() => setMounted(true))`)
      // and derived-state resets, both intentional here.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
