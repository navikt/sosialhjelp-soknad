import {defineConfig, globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier/flat";
import testingLibrary from "eslint-plugin-testing-library";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    prettierConfig,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", {argsIgnorePattern: "^_"}],
            "no-console": "warn",
            "@typescript-eslint/no-explicit-any": "off",
            "@next/next/no-img-element": "off",
        },
    },
    {
        files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
        ...testingLibrary.configs["flat/react"],
        rules: {
            "testing-library/no-debugging-utils": "warn",
        },
    },
    globalIgnores(["src/generated/**", "playwright-report/**", "test-results/**", "**/*.mjs"]),
]);

export default eslintConfig;
