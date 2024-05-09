// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({ignores: ['build/', 'src/generated/']},eslint.configs.recommended, ...tseslint.configs.recommended, {
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": ["error", {argsIgnorePattern: "^_"}],
    },
});
