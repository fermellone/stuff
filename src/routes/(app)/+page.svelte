<script lang="ts">
	import type { Asset } from '$domain/models/asset';
	import { userState } from '$presentation/stores/auth';
	import { homeState } from '$presentation/stores/home';
	import { onMount } from 'svelte';

	let isLoading = true;

	let assetName: string = '';
	let storeName: string = '';
	let assets: Asset[] = [];

	async function addAsset() {
		const assetId = await $homeState.addAsset({
			name: assetName,
			store: storeName
		});

		const newAsset: Asset = {
			id: assetId,
			name: assetName,
			store: storeName,
			userId: $userState?.id
		};

		assets.push({
			...newAsset,
			id: assetId
		});

		assetName = '';
		storeName = '';
	}

	async function deleteAsset(assetId: string) {
		await $homeState.deleteAsset(assetId);

		assets = assets.filter((asset) => asset.id !== assetId);
	}

	onMount(async () => {
		try {
			await $homeState.fetch();
		} catch (error) {
			// alert('Error fetching data');
			console.error(error);
		} finally {
			isLoading = false;
		}
	});
</script>

<div class="bg-white shadow sm:rounded-lg">
	<div class="px-4 py-5 sm:p-6">
		<h3 class="text-lg leading-6 font-medium text-gray-900">New asset</h3>
		<div class="mt-2 max-w-xl text-sm text-gray-500">
			<p>Add the new asset you want to buy</p>
		</div>
		<form class="mt-5 sm:flex sm:items-center" on:submit|preventDefault={addAsset}>
			<div class="w-full sm:max-w-xs">
				<label for="text" class="sr-only">Name</label>
				<input
					type="text"
					name="text"
					id="text"
					class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
					placeholder="mouse"
					autocomplete="off"
					bind:value={assetName}
				/>
			</div>
			<div class="w-full sm:max-w-xs sm:ml-3">
				<label for="text" class="sr-only">Store</label>
				<input
					type="text"
					name="text"
					id="text"
					class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
					placeholder="amazon"
					autocomplete="off"
					bind:value={storeName}
				/>
			</div>
			<button
				type="submit"
				class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
				>Submit</button
			>
		</form>
	</div>
</div>

<div>
	<div class="flow-root mt-6">
		{#if isLoading}
			Loading...
		{:else if !$homeState.assets.length}
			No assets yet
		{:else}
			<ul class="-my-5 divide-y divide-gray-200">
				{#each $homeState.assets as asset}
					<li class="py-4">
						<div class="flex items-center space-x-4 px-4">
							<div class="flex-1 min-w-0">
								<p class="text-sm font-medium text-gray-900 truncate">{asset.name}</p>
								<p class="text-sm text-gray-500 truncate">
									{asset.store || 'no store assigned yet'}
								</p>
							</div>
							<div>
								<a
									href="/assets/{asset.id}"
									class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
								>
									Edit
								</a>
								<button
									class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
									on:click={() => {
										deleteAsset(asset.id);
									}}
								>
									Delete
								</button>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
	<!-- <div class="mt-6">
		<a
			href="#"
			class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
		>
			View all
		</a>
	</div> -->
</div>
