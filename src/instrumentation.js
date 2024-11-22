export async function register() {
    // eslint-disable-next-line no-undef
    if (process.env.NEXT_RUNTIME === "nodejs") {
        // eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
        require("pino");
        // eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
        await require("next-logger");
        // eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
        require("@navikt/next-logger");
    }
}
