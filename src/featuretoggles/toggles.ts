export const UNLEASH_COOKIE_NAME = "unleash-session-id";

export const EXPECTED_TOGGLES = [] as const satisfies readonly string[];

export type ExpectedToggles = (typeof EXPECTED_TOGGLES)[number];
