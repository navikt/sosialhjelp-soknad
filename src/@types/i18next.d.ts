import "i18next";

// Added January 2023 by Tore Sinding Bekkedal
// For compatibility with legacy design components, we make t() return string,
// and not string | null. Might be irrelevant at some future point.
// See also src/i18n.tsx
declare module "i18next" {
    interface CustomTypeOptions {
        returnNull: false;
    }
}
