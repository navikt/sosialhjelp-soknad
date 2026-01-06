export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("pino");
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        await require("next-logger");
    }
}
