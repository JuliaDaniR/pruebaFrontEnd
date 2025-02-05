// user.ts

export interface UserCredentials {
	email: string;
	password: string;
}

export interface AuthContextType {
	user: LoginResponse | null;
	isLoggedIn: boolean;
	loginUser: (userData: UserCredentials) => Promise<LoginResponse>;
	logout: () => void;
	logoutIntentional: boolean | null;
}

export interface LoginResponse {
	jwtToken: string;
	name: string;
	role: LoginRole;
	dni: string;
}

export type LoginRole = 'TEACHER' | 'USER' | 'ADMIN' | 'LOGGED';
