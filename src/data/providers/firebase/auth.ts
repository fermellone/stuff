import { app } from '$data/providers/firebase/config';
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup
} from 'firebase/auth';

export const auth = getAuth(app);

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

	get userData() {
		return auth.currentUser;
	}
}

export default Auth;
