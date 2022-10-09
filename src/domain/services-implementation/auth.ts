import type { AuthService } from '$data/services-contracts/auth';
import Auth from '$data/providers/firebase/auth';
import type { User } from '$domain/models/User';

const auth = new Auth();

class AuthServiceImplementation implements AuthService {
	async loginWithGoogle(): Promise<User> {
		const user = await auth.loginWithGoogle();
		return { id: user.uid, email: user.email, name: user.displayName, photo: user.photoURL };
	}

	async logout() {
		await auth.logout();
	}
}

export default AuthServiceImplementation;
