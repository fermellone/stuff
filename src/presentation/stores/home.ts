import type { Asset, AssetForm } from '$domain/models/asset';
import AssetsServiceImplementation from '$domain/services-implementation/assets';
import { get, writable, type Writable } from 'svelte/store';
import { userState } from './auth';

const assetsService = new AssetsServiceImplementation();

interface HomeState {
	assets: Asset[];
	fetch: () => Promise<void>;
	addAsset: (newAsset: AssetForm) => Promise<string>;
	deleteAsset: (id: string) => Promise<void>;
}

const initialState: HomeState = {
	assets: [],
	fetch: async () => {
		const assets = await assetsService.getAll();
		homeState.update((state) => ({ ...state, assets }));
		console.log(assets);
	},
	addAsset: async (asset) => {
		const id = await assetsService.create<AssetForm>(asset);
		homeState.update((state) => ({
			...state,
			assets: [...state.assets, { ...asset, id, userId: get(userState)?.id }]
		}));
		return id;
	},
	deleteAsset: async (id) => {
		await assetsService.delete(id);
		homeState.update((state) => ({
			...state,
			assets: state.assets.filter((asset) => asset.id !== id)
		}));
	}
};

export const homeState: Writable<HomeState> = writable(initialState);
