import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { checkIfLoggedIn, fetchUserState } from '$presentation/stores/auth';

export function load() {
	if (browser) {
		const isLoggedIn = checkIfLoggedIn();

		if (!isLoggedIn) {
			goto('/login');
		} else {
			fetchUserState();
		}
	}
}
