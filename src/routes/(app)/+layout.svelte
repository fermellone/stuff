<script lang="ts">
	import { logout } from '$presentation/stores/auth';
</script>

<button on:click={logout}>logout</button>
<slot />
