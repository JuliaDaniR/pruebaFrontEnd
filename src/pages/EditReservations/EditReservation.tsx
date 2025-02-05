import React, { useState, useEffect, useCallback } from 'react';
import { UseReservations } from '../../helpers/hooks/UseReservations';
import {
	Reservation,
	ReservationSimple,
} from '../../models/teacher/ReservationGetUser';
import { useNavigate } from 'react-router-dom';
import { DeviceService } from '../../services/ResourceService';
import { Device } from '../../models/Device';

interface SubmitData {
	startDate: string;
	reservationShiftStatus: string;
	selectedTimeSlot: string;
	resourceId: number;
}

const EditReservation: React.FC = () => {
	const navigate = useNavigate();

	const today = new Date().toISOString().split('T')[0];
	const [startDate, setStartDate] = useState<string>('');
	const [shift, setShift] = useState<string>('MANANA');
	const [timeSlot, setTimeSlot] = useState<string>('');
	const [resourceId, setResourceId] = useState<number>(0);
	const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
	const { getAllDevices } = DeviceService();
	const [resourcesData, setResourceData] = useState<Device[]>();

	const { getReservationId, updateReservation, getAllReservationsData } =
		UseReservations();

	const onSubmit = async ({
		startDate,
		reservationShiftStatus,
		selectedTimeSlot,
		resourceId,
	}: SubmitData) => {
		const reservationUpdate: ReservationSimple = {
			startDate,
			reservationShiftStatus,
			selectedTimeSlot,
			resourceId,
		};

		try {
			await updateReservation(reservationUpdate);
			navigate('/teacher-dashboard');
		} catch (error) {
			console.error('Error actualizando la reserva:', error);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(resourceId);
		onSubmit({
			startDate,
			reservationShiftStatus: shift,
			selectedTimeSlot: timeSlot,
			resourceId,
		});
	};

	const timeSlots: { [key: string]: string[] } = {
		MANANA: ['07-08', '08-09', '09-10', '10-11', '11-12', '12-13'],
		TARDE: ['13-14', '14-15', '15-16', '16-17', '17-18'],
		NOCHE: ['18-19', '19-20', '20-21', '21-22'],
	};

	const getAllDevicesMemoized = useCallback(async () => {
		const devices = await getAllDevices();
		const devicesData = devices?.data;
		if (JSON.stringify(devicesData) !== JSON.stringify(resourcesData)) {
			setResourceData(devicesData || []);
		}
	}, [getAllDevices, resourcesData]);

	useEffect(() => {
		getAllDevicesMemoized();
	}, [getAllDevicesMemoized]);

	const checkResourceAvailability = async (selectedDate: string) => {
		const resource = resourcesData?.find((r) => r.id === resourceId);
		if (resource?.status === 'AVAILABLE' || resource?.status === 'IN_USE') {
			try {
				const reservationsData = await getAllReservationsData();
				const reservations: Reservation[] | ReservationSimple[] =
					reservationsData || [];

				const reservedSlots = reservations
					.filter(
						(res: ReservationSimple | Reservation) =>
							res.startDate === selectedDate &&
							res.reservationShiftStatus === shift &&
							res.resourceId === resourceId,
					)
					.map((res: ReservationSimple | Reservation) => res.selectedTimeSlot);

				const filteredSlots = timeSlots[shift].filter(
					(slot) => !reservedSlots.includes(slot),
				);
				setAvailableTimeSlots(filteredSlots);
			} catch (error) {
				console.error('Error obteniendo reservas:', error);
				setAvailableTimeSlots(timeSlots[shift]);
			}
		} else {
			setAvailableTimeSlots([]);
		}
	};

	useEffect(() => {
		const fetchReservationData = async () => {
			const reservation = await getReservationId();
			if (reservation) {
				setStartDate(reservation.startDate);
				setShift(reservation.reservationShiftStatus);
				setTimeSlot(reservation.selectedTimeSlot);
				setResourceId(reservation.resourceId);
			}
		};
		fetchReservationData();
	}, [getReservationId]);

	useEffect(() => {
		if (startDate && resourceId) {
			checkResourceAvailability(startDate);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [startDate, shift, resourceId]);

	return (
		<div className='flex justify-center items-center min-h-[90vh] bg-gray-100 p-4 text-2xl'>
			<div className='p-4 max-w-[50%] min-w-[500px] mx-auto bg-white rounded-xl shadow-md'>
				<h2 className='text-4xl font-bold text-center text-sky-600 mb-4'>
					Editar Reserva
				</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-gray-700'>Recurso:</label>
						<select
							value={resourceId}
							onChange={(e) => setResourceId(Number(e.target.value))}
							className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-sky-500'
							required>
							<option value=''>Seleccionar recurso</option>
							{resourcesData?.map((resource) => (
								<option key={resource.id} value={resource.id}>
									{resource.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className='block text-gray-700'>Fecha:</label>
						<input
							type='date'
							value={startDate}
							min={today}
							onChange={(e) => setStartDate(e.target.value)}
							className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-sky-500'
							required
						/>
					</div>

					<div>
						<label className='block text-gray-700'>Turno:</label>
						<select
							value={shift}
							onChange={(e) => setShift(e.target.value)}
							className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-sky-500'>
							<option value='MANANA'>Mañana</option>
							<option value='TARDE'>Tarde</option>
							<option value='NOCHE'>Noche</option>
						</select>
					</div>

					<div>
						<label className='block text-gray-700'>Horario:</label>
						<select
							value={timeSlot}
							onChange={(e) => setTimeSlot(e.target.value)}
							className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-sky-500'
							required>
							<option value={''}>Seleccionar horario</option>
							{availableTimeSlots.map((slot) => (
								<option key={slot} value={slot}>
									{slot}
								</option>
							))}
						</select>
					</div>

					<button
						type='submit'
						className='w-full bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded'>
						Guardar Cambios
					</button>
				</form>
			</div>
		</div>
	);
};

export { EditReservation };
