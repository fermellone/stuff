import type { User } from '$domain/models/User';

export interface AuthService {
	loginWithGoogle(): Promise<User>;
}
