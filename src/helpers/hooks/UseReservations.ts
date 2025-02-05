import { useParams } from 'react-router-dom';
import { useAuthProvider } from '../../context/AuthProvider';
import {
	createReservation,
	deleteReservationByID,
	getAllReservations,
	getReservationsByID,
	getReservationsByUser,
	updateReservationByID,
} from '../../services/teacher/reservationsRequest';
import { useCallback } from 'react';
import {
	CreateReservationResponse,
	Reservation,
	ReservationSimple,
} from '../../models/teacher/ReservationGetUser';

export const UseReservations = () => {
	const { user } = useAuthProvider();
	const { page, id } = useParams<{ page: string; id: string }>();

	// validacion general para las reservas por id
	let idNumber = 0;
	if (id) {
		idNumber = parseInt(id);
	}

	const getReservationTeacher = useCallback(async () => {
		let pageNumber = 0;
		if (page) {
			pageNumber = parseInt(page);
		}
		if (user) {
			const { dni, jwtToken } = user;
			const reservationsResponse = await getReservationsByUser(
				dni,
				pageNumber,
				jwtToken,
			);
			const reservations = reservationsResponse?.data.content;
			return reservations;
		}
	}, [user, page]);

	const getAllReservationsData = useCallback(async () => {
		let pageNumber = 0;
		if (page) {
			pageNumber = parseInt(page);
		}
		if (user) {
			const { jwtToken } = user;
			const reservationsResponse = await getAllReservations(
				pageNumber,
				jwtToken,
			);
			const reservations = reservationsResponse?.data.content;
			return reservations;
		}
	}, [user, page]);

	const getReservationId = useCallback(async () => {
		if (user) {
			const { jwtToken } = user;
			const reservationsResponse = await getReservationsByID(
				idNumber,
				jwtToken,
			);
			const reservations = reservationsResponse;
			return reservations;
		}
	}, [user, idNumber]);

	const deleteReservation = useCallback(
		async (id: number | undefined): Promise<boolean> => {
			if (user) {
				const { jwtToken } = user;
				return await deleteReservationByID(id, jwtToken);
			}
			return false;
		},
		[user],
	);

	const updateReservation = useCallback(
		async (currentData: ReservationSimple): Promise<boolean> => {
			if (user) {
				const { jwtToken } = user;
				return await updateReservationByID(idNumber, jwtToken, currentData);
			}
			return false;
		},
		[user, idNumber],
	);

	const mergeConsecutiveReservations = useCallback(
		(reservations: Reservation[]): Reservation[] => {
			const grouped: { [key: string]: Reservation[] } = {};

			reservations.forEach((reserva) => {
				const key = `${reserva.date}-${reserva.resourceName}-${reserva.reservationShiftStatus}`;
				if (!grouped[key]) grouped[key] = [];
				grouped[key].push(reserva);
			});

			const mergedReservations: Reservation[] = [];

			Object.values(grouped).forEach((group) => {
				group.sort((a, b) => {
					const startA = parseInt(a.selectedTimeSlot.split('-')[0], 10);
					const startB = parseInt(b.selectedTimeSlot.split('-')[0], 10);
					return startA - startB;
				});

				let currentMerge = { ...group[0], mergedReserves: [group[0]] };

				for (let i = 1; i < group.length; i++) {
					const prevEnd = parseInt(
						currentMerge.selectedTimeSlot.split('-')[1],
						10,
					);
					const currentStart = parseInt(
						group[i].selectedTimeSlot.split('-')[0],
						10,
					);
					const currentEnd = parseInt(
						group[i].selectedTimeSlot.split('-')[1],
						10,
					);

					if (prevEnd === currentStart) {
						currentMerge.selectedTimeSlot = `${currentMerge.selectedTimeSlot.split('-')[0]}-${currentEnd}`;
						currentMerge.mergedReserves.push(group[i]);
					} else {
						mergedReservations.push(currentMerge);
						currentMerge = { ...group[i], mergedReserves: [group[i]] };
					}
				}
				mergedReservations.push(currentMerge);
			});

			// Formateo los horarios
			mergedReservations.forEach((reserva) => {
				reserva.selectedTimeSlot = reserva.selectedTimeSlot
					.split('-')
					.map((hour) => (hour.length === 1 ? `0${hour}` : hour))
					.join('-');
			});

			return mergedReservations;
		},
		[],
	);

	const createNewReservation = useCallback(
		async (
			reservationData: ReservationSimple,
		): Promise<CreateReservationResponse | null> => {
			if (user) {
				const { jwtToken } = user;
				return await createReservation(reservationData, jwtToken);
			}
			return null;
		},
		[user],
	);

	return {
		getReservationTeacher,
		getReservationId,
		mergeConsecutiveReservations,
		deleteReservation,
		updateReservation,
		getAllReservationsData,
		createNewReservation,
	};
};
