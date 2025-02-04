import axios from 'axios';
import Swal from 'sweetalert2';
import { LoginResponse, UserCredentials } from '../context/user';
import { getErrorMessage } from '../utils/error';
import { PORT_SERVER } from '.';
import '../App.css';

const loginRequest = async (
	loginData: UserCredentials,
): Promise<LoginResponse> => {
	try {
		const response = await axios.post<LoginResponse>(
			`${PORT_SERVER}/login`,
			loginData,
		);

		Swal.fire({
			icon: 'success',
			title: 'Inicio de sesión exitoso',
			text: `Bienvenido, ${response.data.name}!`,//fullName
			timer: 3000,
			showConfirmButton: false,
			customClass: {
				popup: 'swal-popup-success',
				title: 'swal-title-success',
				confirmButton: 'swal-confirm-button-success',
				icon: 'swal-icon-success'
			},
		});

		return response.data;
	} catch (error: unknown) {
		let errorMessage = 'Ocurrió un error desconocido.';

		if (axios.isAxiosError(error) && error.response) {
			errorMessage = getErrorMessage(error.response.status);
		} else if (error instanceof Error) {
			errorMessage = error.message;
		}

		Swal.fire({
			icon: 'error',
			title: 'Error al iniciar sesión',
			text: errorMessage,
			customClass: {
				popup: 'swal-popup-error',
				title: 'swal-title-error',
				confirmButton: 'swal-confirm-button-error',
				icon: 'swal-icon-error'
			},
		});

		throw new Error(errorMessage);
	}
};

export default loginRequest;
