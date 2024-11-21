// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default tseslint.config(
    {ignores: ["build/**/*", "src/generated/**/*"]},
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            "@next/next": nextPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": ["error", {argsIgnorePattern: "^_"}],
            "@next/next/no-img-element": "off",
        },
    }
);
