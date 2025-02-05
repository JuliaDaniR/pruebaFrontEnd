import axios from 'axios';
import Swal from 'sweetalert2';
import { AdminUpdate } from '../models/admin/AdminUpdate'; // Crea este tipo para la estructura
import { getErrorMessage } from '../utils/error';
import { AdminGet } from '../models/admin/AdminGet';
import { PORT_SERVER } from '.';

export const updateAdminRequest = async (
	userData: AdminUpdate,
	token: string | undefined,
): Promise<void> => {
	try {
		await axios.patch(`${PORT_SERVER}/user/update`, userData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		Swal.fire({
			icon: 'success',
			title: 'Actualización exitosa',
			text: `El usuario ${userData.full_name} ha sido actualizado correctamente.`,
			timer: 3000,
			showConfirmButton: false,
		});
	} catch (error: unknown) {
		let errorMessage = 'Ocurrió un error desconocido.';

		if (axios.isAxiosError(error) && error.response) {
			errorMessage = getErrorMessage(error.response.status);
		} else if (error instanceof Error) {
			errorMessage = error.message;
		}

		Swal.fire({
			icon: 'error',
			title: 'Error al actualizar',
			text: errorMessage,
		});

		throw new Error(errorMessage);
	}
};

export const getAdminData = async (
	fullName: string | undefined,
	token: string,
): Promise<AdminGet | null> => {
	try {
		const response = await axios.get(
			`${PORT_SERVER}/user/getName/${fullName}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (response.data.status === 'success') {
			return response.data.data as AdminGet;
		} else {
			console.error(
				'Error en la respuesta del servidor:',
				response.data.message,
			);
			return null;
		}
	} catch (error) {
		console.error('Error al obtener la información del administrador:', error);
		return null;
	}
};
