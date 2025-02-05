import axios from 'axios';
import Swal from 'sweetalert2';
import { InstitutionUpdate } from '../models/admin/InstitutionUpdate'; // Define el modelo según tu estructura
import { getErrorMessage } from '../utils/error';
import { PORT_SERVER } from '.';
import { InstitutionGet } from '../models/admin/InstitutionGet';

// Función para actualizar la información de una institución
export const updateInstitution = async (
	institutionData: InstitutionUpdate,
	token: string | undefined,
): Promise<void> => {
	try {
		await axios.patch(`${PORT_SERVER}/institution/update`, institutionData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		Swal.fire({
			icon: 'success',
			title: 'Actualización exitosa',
			text: `La institución ${institutionData.name} ha sido actualizada.`,
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

// Nueva función para obtener la información de una institución
export const getInstitutionData = async (
	cue: string | undefined,
	token: string,
): Promise<InstitutionGet | null> => {
	try {
		const response = await axios.get(
			`${PORT_SERVER}/institution/getCue/${cue}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (response.data.status === 'success') {
			return response.data.data; // Ajusta esto según la estructura de tu backend
		} else {
			Swal.fire({
				icon: 'warning',
				title: 'Sin datos',
				text: 'No se encontraron datos para la institución solicitada.',
			});
			return null;
		}
	} catch (error: unknown) {
		let errorMessage = 'Ocurrió un error al obtener la información.';

		if (axios.isAxiosError(error) && error.response) {
			errorMessage = getErrorMessage(error.response.status);
		} else if (error instanceof Error) {
			errorMessage = error.message;
		}

		Swal.fire({
			icon: 'error',
			title: 'Error al obtener datos',
			text: errorMessage,
		});

		throw new Error(errorMessage);
	}
};
