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
}

export interface LoginResponse {
	jwtToken: string;
	name: string;
	role: 'TEACHER' | 'USER' | 'ADMIN';
	dni: string;
}
