export interface AssetsService<Type> {
	getAll(): Promise<Type[]>;
	create(asset: Type): Promise<string>;
	delete(id: string): Promise<void>;
}
