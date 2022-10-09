import { goto } from '$app/navigation';
import type { User } from '$domain/models/User';
import AuthServiceImplementation from '$domain/services-implementation/auth';
import { writable, type Writable } from 'svelte/store';

const authService = new AuthServiceImplementation();

export const userState: Writable<User | null> = writable(null);

export async function loginWithGoogle() {
	const user = await authService.loginWithGoogle();
	localStorage.setItem('loggedIn', 'true');
	userState.set(user);
	goto('/');
}

export async function logout() {
	await authService.logout();
	localStorage.removeItem('loggedIn');
	userState.set(null);
	goto('/login');
}
