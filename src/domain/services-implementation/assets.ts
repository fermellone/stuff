import type { AssetsService } from '$data/services-contracts/assets';
import DB from '$data/providers/firebase/firestore';
import type { Asset } from '$domain/models/asset';

const db = new DB('assets');

class AssetsServiceImplementation implements AssetsService<Asset> {
	async getAll(): Promise<Asset[]> {
		const assets = await db.getAll<Asset>();
		return assets;
	}

	async create<Type>(newAsset: Type): Promise<string> {
		const id = await db.create<Type>(newAsset);
		return id;
	}

	async delete(id: string): Promise<void> {
		await db.delete(id);
	}
}

export default AssetsServiceImplementation;
