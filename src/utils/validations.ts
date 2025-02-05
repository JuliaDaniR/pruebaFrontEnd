import { UserRegister } from '../models/UserRegister';
import { AdminPut } from '../models/admin/AdminGet';
import { InstitutionGet } from '../models/admin/InstitutionGet';

export const validateForm = ({
	address,
	cue,
	dniAdmin,
	educational_level,
	email,
	email_admin,
	full_name_admin,
	name,
	phone,
	website,
	password2_admin,
	password_admin,
}: UserRegister): string | null => {
	if (!full_name_admin.trim()) {
		return 'El nombre completo es obligatorio';
	}

	if (!dniAdmin.trim() || dniAdmin.length !== 8 || !/^\d+$/.test(dniAdmin)) {
		return 'El DNI es obligatorio y debe tener 8 caracteres numéricos';
	}

	if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
		return 'El email es obligatorio y debe tener un formato válido';
	}

	if (!email_admin.trim() || !/\S+@\S+\.\S+/.test(email)) {
		return 'El email es obligatorio y debe tener un formato válido';
	}

	if (
		!password_admin ||
		!password_admin.trim() ||
		password_admin.length < 8 ||
		!/[A-Za-z]/.test(password_admin) ||
		!/\d/.test(password_admin) ||
		!/[!@#$%^&*]/.test(password_admin)
	) {
		return 'La contraseña es obligatoria y debe tener al menos 8 caracteres, incluyendo letras, números y caracteres especiales';
	}

	if (password_admin !== password2_admin) {
		return 'Las contraseñas no coinciden';
	}

	if (!cue.trim()) {
		return 'El CUE es obligatorio';
	}

	if (!name.trim()) {
		return 'La institución es obligatoria';
	}

	if (!educational_level.trim()) {
		return 'El nivel educativo es obligatorio';
	}

	if (!address.trim()) {
		return 'La dirección es obligatoria';
	}

	if (!phone.trim() || !/^\d+$/.test(phone)) {
		return 'El teléfono es obligatorio y debe contener solo números';
	}

	if (
		website.trim() &&
		!/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[\w.-]*)*$/i.test(website)
	) {
		return 'El sitio web debe tener un formato válido';
	}

	return null;
};

export const validationFormAdminUpdate = ({
	dni,
	full_name,
	email,
	password,
}: AdminPut): string | null => {
	if (!full_name.trim()) {
		return 'El nombre es obligatorio';
	}

	if (!dni.trim() || dni.length !== 8 || !/^\d+$/.test(dni)) {
		return 'El DNI es obligatorio y debe tener 8 caracteres numéricos';
	}

	if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
		return 'El email es obligatorio y debe tener un formato válido';
	}

	if (
		!password ||
		!password.trim() ||
		password.length < 8 ||
		!/[A-Za-z]/.test(password) ||
		!/\d/.test(password) ||
		!/[!@#$%^&*]/.test(password)
	) {
		return 'La contraseña es obligatoria y debe tener al menos 8 caracteres, incluyendo letras, números y caracteres especiales';
	}

	return null;
};

export const validateFormInstitutionUpdate = ({
	cue,
	name,
	educational_level,
	address,
	email,
	phone,
	website,
}: InstitutionGet): string | null => {
	if (!email?.trim() || !/\S+@\S+\.\S+/.test(email)) {
		return 'El email es obligatorio y debe tener un formato válido';
	}
	if (!cue?.trim()) {
		return 'El CUE es obligatorio';
	}

	if (!name?.trim()) {
		return 'La institución es obligatoria';
	}

	if (!educational_level?.trim()) {
		return 'El nivel educativo es obligatorio';
	}

	if (!address?.trim()) {
		return 'La dirección es obligatoria';
	}

	if (!phone?.trim() || !/^\d+$/.test(phone)) {
		return 'El teléfono es obligatorio y debe contener solo números';
	}

	if (website == ' ') {
		return 'El sitio web debe tener un formato válido';
	}

	return null;
};
