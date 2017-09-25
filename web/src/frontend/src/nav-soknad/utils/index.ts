export * from "./animationUtils";
export * from "./intlUtils";
export * from "./faktumUtils";

export function boolToString(flag: boolean) {
	return flag ? "true" : "false";
}

export function contains(node: Element, child: Element) {
	return node === child || node.contains(child);
}
