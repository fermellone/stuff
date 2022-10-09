import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export function load() {
	if (browser) {
		const loggedIn = !!localStorage?.getItem('loggedIn');

		if (loggedIn) {
			goto('/');
		}
	}
}
