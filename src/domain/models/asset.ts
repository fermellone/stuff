export interface Asset {
	id: string;
	name: string;
	store: string;
	userId?: string;
}

export interface AssetForm {
	name: string;
	store: string;
}
