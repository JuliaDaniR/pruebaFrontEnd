export interface AdminGet {
	dni?: string;
	fullName?: string;
	email?: string;
	nameSchool?: string;
}

export interface AdminPut {
	dni: string;
	full_name: string;
	email: string;
	password: string;
	password2?: string;
}
