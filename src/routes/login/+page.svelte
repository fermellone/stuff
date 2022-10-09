<script lang="ts">
	import { loginWithGoogle } from '$presentation/stores/auth';
</script>

<button on:click={loginWithGoogle}> login </button>
