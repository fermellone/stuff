<script lang="ts">
	import { logout, userState } from '$presentation/stores/auth';
	import { Icon, ChartBar } from 'svelte-hero-icons';

	let isOpen: boolean = false;
</script>

<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<header class="bg-white shadow-sm flex flex-nowrap justify-end py-2 px-6">
	<div class="flex-shrink-0 ml-auto">
		<img class="h-10 w-10 rounded-full" src={$userState?.photo} alt="" />
	</div>

	<button
		on:click={logout}
		class="ml-6 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>Sign out</button
	>
</header>
