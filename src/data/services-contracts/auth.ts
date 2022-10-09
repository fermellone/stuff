import type { User } from '$domain/models/user';

export interface AuthService {
	loginWithGoogle(): Promise<User>;
}
