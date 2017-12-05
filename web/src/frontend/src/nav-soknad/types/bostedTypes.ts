export interface Bydel {
	id: string;
	navn: string;
}

export interface Kommune {
	id: string;
	navn: string;
	bydeler?: Bydel[];
}
