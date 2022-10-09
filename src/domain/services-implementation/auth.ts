import type { AuthService } from '$data/services-contracts/auth';
import Auth from '$data/providers/firebase/auth';
import type { User } from '$domain/models/user';

const auth = new Auth();

class AuthServiceImplementation implements AuthService {
	async loginWithGoogle(): Promise<User> {
		const user = await auth.loginWithGoogle();
		return { id: user.uid, email: user.email, name: user.displayName, photo: user.photoURL };
	}

	async logout() {
		await auth.logout();
	}

	get userData() {
		console.log('1', auth.userData);
		if (!auth.userData) {
			return null;
		}
		return {
			id: auth.userData.uid,
			email: auth.userData.email,
			name: auth.userData.displayName,
			photo: auth.userData.photoURL
		};
	}
}

export default AuthServiceImplementation;
