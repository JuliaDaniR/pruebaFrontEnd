import axios from 'axios';
import Swal from 'sweetalert2';
import { PORT_SERVER } from '..';
import {
	ReservationResponse,
	ReservationSimple,
} from '../../models/teacher/ReservationGetUser';

export const getReservationsByUser = async (
	dni: string,
	page: number = 0,
	token: string,
): Promise<ReservationResponse | null> => {
	try {
		const response = await axios.get<ReservationResponse>(
			`${PORT_SERVER}/reservations/byUser/${dni}`,
			{
				params: { page },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error('Error al obtener las reservas:', error);
		Swal.fire({
			title: 'Error',
			text: 'No se pudieron obtener las reservas. Intenta nuevamente.',
			icon: 'error',
			confirmButtonText: 'Aceptar',
		});
		return null;
	}
};

export const getReservationsByID = async (
	id: number,
	token: string,
): Promise<ReservationSimple | null> => {
	try {
		const response = await axios.get<ReservationSimple>(
			`${PORT_SERVER}/reservations/getId/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error al obtener las reservas:', error);
		Swal.fire({
			title: 'Error',
			text: 'No se pudieron obtener las reservas. Intenta nuevamente.',
			icon: 'error',
			confirmButtonText: 'Aceptar',
		});
		return null;
	}
};

export const deleteReservationByID = async (
	id: number,
	token: string,
): Promise<boolean> => {
	try {
		const confirmResult = await Swal.fire({
			title: '¿Estás seguro de que deseas eliminar esta reserva?',
			text: 'Esta acción eliminará tu reserva.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Sí, eliminar',
			cancelButtonText: 'Cancelar',
		});

		if (confirmResult.isConfirmed) {
			await axios.put(`${PORT_SERVER}/reservations/delete/${id}`, '', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			Swal.fire({
				title: 'Eliminado',
				text: 'La reserva ha sido eliminada exitosamente.',
				icon: 'success',
				confirmButtonText: 'Aceptar',
			});

			return true;
		}

		return false;
	} catch (error) {
		let errorMessage;
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.message;
		} else {
			console.error('Error desconocido:', error);
		}
		console.error('Error al eliminar la reserva:', error);
		Swal.fire({
			title: 'Error',
			text: errorMessage,
			icon: 'error',
			confirmButtonText: 'Aceptar',
		});
		return false;
	}
};

export const updateReservationByID = async (
	id: number,
	token: string,
	currentData: ReservationSimple,
): Promise<boolean> => {
	try {
		const { startDate, selectedTimeSlot, reservationShiftStatus, resourceId } =
			currentData;
		console.log(currentData);
		const data = {
			startDate,
			selectedTimeSlot,
			reservationShiftStatus,
			resourceid: resourceId,
		};
		await axios.patch(`${PORT_SERVER}/reservations/update/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		await Swal.fire({
			title: 'Modificado',
			text: 'La reserva ha sido actualizada exitosamente.',
			icon: 'success',
			confirmButtonText: 'Aceptar',
		});

		return true;
	} catch (error) {
		let errorMessage;
		// Verificar si el error es de tipo AxiosError
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.message;
		} else {
			console.error('Error desconocido:', error);
		}
		Swal.fire({
			title: 'Error',
			text: errorMessage,
			icon: 'error',
			confirmButtonText: 'Aceptar',
		});
		return false;
	}
};
