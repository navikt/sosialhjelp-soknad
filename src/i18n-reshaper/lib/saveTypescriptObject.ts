const toJson = (obj: object) => JSON.stringify(obj, null, 2);
export const saveTypescriptObject = (
    obj: object,
    filename: string,
    exportName: string,
    typeName?: string,
    preamble: string = ""
) => {
    const type = typeName ? `: ${typeName}` : "";
    return Bun.write(
        filename,
        `${preamble}\nexport const ${exportName}${type} = ${toJson(obj)}\n\nexport default ${exportName}`
    );
};
