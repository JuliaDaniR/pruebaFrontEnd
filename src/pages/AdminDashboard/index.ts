export * from './AdminDashboard';

export interface AdminInfo {
	full_name_admin: string;
	dniAdmin: string;
	email_admin: string;
	password_admin: string;
	cue: string;
	name: string;
	educational_level: string;
	address: string;
	email: string;
	phone: string;
	website: string;
}

export interface ButtonPropsAdminHome {
	onClick?: () => void;
	text: string;
}

export interface PropsAdminHomeData {
	adminFull: AdminInfo;
}
