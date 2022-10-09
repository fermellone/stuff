<script lang="ts">
	import '../../app.css';
	import { logout } from '$presentation/stores/auth';
</script>

<button on:click={logout}>logout</button>
<slot />
