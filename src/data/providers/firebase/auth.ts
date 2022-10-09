import { app } from '$data/providers/firebase/config';
import { ENV } from '$lib/config';
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	connectAuthEmulator
} from 'firebase/auth';

export const auth = getAuth(app);
if (ENV === 'development') {
	connectAuthEmulator(auth, 'http://localhost:9099');
}

class Auth {
	async login(email: string, password: string) {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential.user;
	}

	async loginWithGoogle() {
		const provider = new GoogleAuthProvider();
		const { user } = await signInWithPopup(auth, provider);
		return user;
	}

	async register(email: string, password: string) {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
		return user;
	}

	async logout() {
		await auth.signOut();
	}
}

export default Auth;
