const SUFFIXES = ["bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"] as const;

export const humanizeFilesize = (bytes: number | null) => {
    if (bytes === null) return "";
    if (bytes === 0) return "0 bytes";
    if (bytes === 1) return "1 byte";

    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), SUFFIXES.length - 1);
    const value = (bytes / Math.pow(1024, i)).toFixed(2).replace(/\.?0+$/, "");
    return `${value} ${SUFFIXES[i]}`;
};
