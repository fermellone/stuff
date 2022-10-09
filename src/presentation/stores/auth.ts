import { goto } from '$app/navigation';
import type { User } from '$domain/models/user';
import AuthServiceImplementation from '$domain/services-implementation/auth';
import { writable, type Writable } from 'svelte/store';

const authService = new AuthServiceImplementation();

export const userState: Writable<User | null> = writable(null);

export async function loginWithGoogle() {
	const user = await authService.loginWithGoogle();
	localStorage.setItem('user', JSON.stringify(user));
	userState.set(user);
	goto('/');
}

export async function logout() {
	await authService.logout();
	localStorage.removeItem('user');
	userState.set(null);
	goto('/login');
}

export function fetchUserState() {
	const user = localStorage.getItem('user');
	if (user) {
		userState.set(JSON.parse(user));
	}
}

export function checkIfLoggedIn() {
	return !!localStorage.getItem('user');
}
