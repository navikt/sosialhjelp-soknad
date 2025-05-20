import {DefaultNamespace, Namespace, ParseKeys, TOptions} from "i18next";

export const defaultNS = "skjema" as const;
export type DigisosLanguageKey<Ns extends Namespace = DefaultNamespace, TPrefix = undefined> = ParseKeys<
    Ns,
    TOptions,
    TPrefix
>;
export const SUPPORTED_LANGUAGES = ["en", "nb", "nn"] as const;
export const DEFAULT_LANGUAGE = "nb";
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const isSupportedLanguage = (lang: string): lang is SupportedLanguage =>
    SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);

/** Returns the language if it's supported (nb, en or nn), defaults to nb if it isn't. */
export const supportedLanguageOrFallback = (lang?: string) => (lang && isSupportedLanguage(lang) ? lang : "nb");
