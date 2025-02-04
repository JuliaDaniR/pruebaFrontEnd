import axios from 'axios';
import Swal from 'sweetalert2';
import { RegisterResponse } from '../context/register';
import { getErrorMessage } from '../utils/error';
import { UserRegister } from '../models/UserRegister';
import { PORT_SERVER } from '.';

const registerRequest = async (
	userRegisterInFormData: UserRegister,
): Promise<RegisterResponse> => {
	try {
		const response = await axios.post<RegisterResponse>(
			`${PORT_SERVER}/institution/register`,
			{ ...userRegisterInFormData }
		);

    Swal.fire({
		icon: 'success',
		title: 'Registro exitoso',
		timer: 3000,
		text: `Bienvenido, ${userRegisterInFormData.full_name_admin}!`,
		
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
			title: 'Error al registrarse',
			text: errorMessage,
		});

		throw new Error(errorMessage);
	}
};

export default registerRequest;