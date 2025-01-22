import axios from 'axios';
import Swal from 'sweetalert2';
import { LoginResponse, UserCredentials } from '../context/user';
import { getErrorMessage } from '../utils/error';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const loginRequest = async (
	loginData: UserCredentials,
): Promise<LoginResponse> => {
	try {
		const response = await axios.post<LoginResponse>(
			`${backendUrl}/login`,
			loginData,
		);

		Swal.fire({
			icon: 'success',
			title: 'Inicio de sesión exitoso',
			text: `Bienvenido, ${response.data.name}!`,
			timer: 3000,
			showConfirmButton: false,
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
		});

		throw new Error(errorMessage);
	}
};

export default loginRequest;
