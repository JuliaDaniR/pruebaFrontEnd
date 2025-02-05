import React, { useState, useEffect, useCallback } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { DeviceService } from '../../services/ResourceService';
import { UseReservations } from '../../helpers/hooks/UseReservations';
import {
	Reservation,
	ReservationSimple,
} from '../../models/teacher/ReservationGetUser';
import Swal from 'sweetalert2';

interface Resource {
	id: number;
	name: string;
	description: string;
	category: string;
	status: string;
	inventoryId: number;
}

const turnMapping: { [key: string]: string } = {
	MANANA: 'Mañana',
	TARDE: 'Tarde',
	NOCHE: 'Noche',
};

const AddNewReservation = () => {
	const today = new Date().toISOString().split('T')[0];

	const [resources, setResources] = useState<Resource[]>([]);
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [selectedResource, setSelectedResource] = useState<Resource | null>(
		null,
	);
	const [selectedTime, setSelectedTime] = useState<string>('');
	const [selectedTurn, setSelectedTurn] = useState<string>('');
	const { getAllDevices } = DeviceService();
	const { getAllReservationsData, createNewReservation } = UseReservations();

	const getAllDevicesMemoized = useCallback(async () => {
		const devicesData = await getAllDevices();
		if (devicesData === undefined) return;
		if (JSON.stringify(devicesData) !== JSON.stringify(resources)) {
			setResources(devicesData || []);
		}
	}, [getAllDevices, resources]);

	useEffect(() => {
		getAllDevicesMemoized();
	}, [getAllDevicesMemoized]);

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValueDate = e.target.value;
		setSelectedDate(inputValueDate);
	};
	const validateDate = () => {
		const maxDate = new Date();
		maxDate.setDate(maxDate.getDate() + 30);
		const formattedMaxDate = maxDate.toISOString().split('T')[0];
		if (selectedDate && selectedDate < today) {
			Swal.fire({
				icon: 'error',
				title: 'Fecha inválida',
				text: 'No puedes seleccionar una fecha anterior a hoy.',
				confirmButtonText: 'Aceptar',
			});
			setSelectedDate('');
		} else if (selectedDate > formattedMaxDate) {
			Swal.fire({
				icon: 'error',
				title: 'Fecha inválida',
				text: 'No puedes seleccionar una fecha superior a 30 días desde hoy.',
				confirmButtonText: 'Aceptar',
			});
			setSelectedDate('');
		}
	};

	const handleResourceChange = (resource: Resource) => {
		setSelectedResource(resource);
		setSelectedTime('');
	};

	const handleTurnChange = (turn: string) => {
		setSelectedTurn(turn);
		setSelectedTime('');
	};

	const handleTimeChange = (time: string) => {
		setSelectedTime(time);
	};

	const availableTimesByTurn: { [key: string]: string[] } = {
		MANANA: ['07-08', '08-09', '09-10', '10-11', '11-12', '12-13'],
		TARDE: ['13-14', '14-15', '15-16', '16-17', '17-18'],
		NOCHE: ['18-19', '19-20', '20-21', '21-22'],
	};

	const [existingReservations, setExistingReservations] = useState<
		Reservation[] | ReservationSimple[] | undefined
	>([]);

	useEffect(() => {
		const fetchReservations = async () => {
			const reservations = await getAllReservationsData();
			setExistingReservations(reservations);
		};
		fetchReservations();
	}, [getAllReservationsData]);

	const getAvailableTimes = () => {
		if (!selectedTurn || !selectedDate || !selectedResource) return [];

		const reservedTimes = existingReservations
			?.filter(
				(reservation) =>
					reservation.startDate === selectedDate &&
					reservation.resourceId === selectedResource.id &&
					reservation.reservationShiftStatus === selectedTurn,
			)
			.map((reservation) => reservation.selectedTimeSlot);

		return (
			availableTimesByTurn[selectedTurn]?.map((time) => ({
				time,
				isAvailable: !reservedTimes?.includes(time),
			})) || []
		);
	};

	const handleConfirmReservation = async () => {
		if (selectedDate && selectedTurn && selectedTime && selectedResource) {
			try {
				await createNewReservation({
					startDate: selectedDate,
					reservationShiftStatus: selectedTurn,
					selectedTimeSlot: selectedTime,
					resourceId: selectedResource.id,
				});

				const updatedReservations = await getAllReservationsData();
				setExistingReservations(updatedReservations);
				setSelectedDate('');
				setSelectedResource(null);
				setSelectedTurn('');
				setSelectedTime('');
			} catch (error) {
				console.error('Error al crear la reserva:', error);
			}
		}
	};

	return (
		<div className='p-6 py-10 max-w-3xl mx-auto'>
			<h2 className='text-4xl font-bold mb-4 text-sky-700'>
				Añadir nueva reserva
			</h2>

			{/* Selector de fecha */}
			<div className='mb-4'>
				<label className='block text-2xl my-2 text-bold text-sky-700'>
					Selecciona una fecha
				</label>
				<input
					type='date'
					min={today}
					value={selectedDate}
					onChange={handleDateChange}
					onBlur={validateDate}
					placeholder='DD/MM/AAAA'
					className='mt-2 p-2 border border-gray-300 rounded-md text-2xl uppercase'
				/>
			</div>

			{/* Lista de recursos */}
			<div className='my-6'>
				<label className='block text-2xl my-2 text-bold text-sky-700'>
					Selecciona un recurso
				</label>
				<div className='space-y-2'>
					{resources.map((resource) => (
						<div
							key={resource.id}
							onClick={() => handleResourceChange(resource)}
							className={`flex items-center justify-between p-2 px-4 border rounded-md cursor-pointer ${
								resource.status === 'IN_USE' ? 'bg-red-100' : 'bg-green-100'
							} ${selectedResource?.id === resource.id ? 'shadow-lg border-blue-300 scale-105 text-bold text-blue-500' : ''}`}>
							<span className='font-medium text-base'>{resource.name}</span>
							<span className='flex items-center text-base'>
								{resource.status === 'IN_USE' ? (
									<FaTimesCircle className='text-red-500' />
								) : (
									<FaCheckCircle className='text-green-500' />
								)}
								<span className='ml-2'>
									{resource.status === 'IN_USE' ? 'En uso' : 'Disponible'}
								</span>
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Selector de turno */}
			{selectedResource && selectedDate && (
				<div className='mb-4'>
					<label className='block text-2xl my-2 text-bold text-sky-700'>
						Selecciona un turno
					</label>
					<div className='space-x-4 text-xl'>
						{['MANANA', 'TARDE', 'NOCHE'].map((turn) => (
							<button
								key={turn}
								onClick={() => handleTurnChange(turn)}
								className={`p-3 rounded-md ${
									selectedTurn === turn
										? 'bg-blue-500 text-white'
										: 'bg-white hover:bg-blue-200'
								}`}>
								{turnMapping[turn]}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Selección de horarios */}
			{selectedResource && selectedTurn && (
				<div className='mb-4'>
					<label className='block text-2xl my-2 text-bold text-sky-700'>
						Selecciona un horario
					</label>
					<div className='grid grid-cols-3 gap-2 text-xl'>
						{getAvailableTimes().map(({ time, isAvailable }) => (
							<button
								key={time}
								onClick={() => handleTimeChange(time)}
								disabled={!isAvailable}
								className={`p-2 border rounded-md ${
									selectedTime === time
										? 'bg-blue-500 text-white'
										: isAvailable
											? 'bg-white hover:bg-blue-100'
											: 'bg-gray-300 cursor-not-allowed'
								}`}>
								{time}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Botón de confirmación */}
			<div className='mt-4'>
				<button
					onClick={handleConfirmReservation}
					disabled={!selectedDate || !selectedResource || !selectedTime}
					className={`w-full py-3 px-6 text-lg font-medium text-white rounded-lg ${
						!selectedDate || !selectedResource || !selectedTime
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-sky-500 hover:bg-blue-600'
					}`}>
					Confirmar reserva
				</button>
			</div>
		</div>
	);
};

export { AddNewReservation };
