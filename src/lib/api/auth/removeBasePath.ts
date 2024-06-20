export const removeBasePath = (str: string | null, prefix: string) => {
    if (!str) return null;
    const isPrefixed = str.startsWith(prefix);
    const path = isPrefixed ? str.substring(prefix.length) : str;
    return path.length ? path : null;
};
