import React, { useEffect, useRef, useState } from 'react';
import { UseReservations } from '../../helpers/hooks/UseReservations';
import {
	Reservation,
	ReservationSimple,
} from '../../models/teacher/ReservationGetUser';
import ModalCheckReservations from './ModalCheckReservations';
import { Reservations } from './Reservations';
import { revertDate } from '../../utils/stringReverse';
import { EmptyReservationsMessage } from './EmptyReservationsMessage';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CheckReservations: React.FC = () => {
	const navigate = useNavigate();
	const [dataReservations, setDataReservations] = useState<
		Reservation[] | null
	>(null);
	const [indiReservations, setIndiReservations] = useState<
		Reservation[] | null
	>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { getReservationTeacher, mergeConsecutiveReservations } =
		UseReservations();

	const prevReservationsRef = useRef<
		Reservation[] | ReservationSimple[] | null
	>(null);

	useEffect(() => {
		const fetchReservations = async () => {
			const booking = await getReservationTeacher();

			if (booking) {
				const mergedReservations = mergeConsecutiveReservations(booking);
				prevReservationsRef.current = booking;
				setDataReservations(mergedReservations);
			}
		};
		fetchReservations();
	}, [getReservationTeacher, mergeConsecutiveReservations]);

	const handleAddReservation = () => {
		navigate('/new-reservations');
	};

	return (
		<div className='relative bg-gray-100 shadow-md rounded border border-gray-200 px-8 pt-8 pb-8 mb-4 m-8'>
			<h2 className='text-4xl font-medium leading-6 text-sky-600 mb-4'>
				Mis Reservas
			</h2>

			<button
				className='absolute top-4 right-4 group bg-sky-600 text-white p-3 rounded-full shadow-lg hover:bg-sky-700 focus:outline-none transition-transform duration-300 hover:scale-110'
				onClick={handleAddReservation}>
				<FiPlus className='w-5 h-5' />

				{/* Tooltip */}
				<span className='absolute top-12 right-1/2 translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap'>
					Agregar Reserva
				</span>
			</button>

			{dataReservations && dataReservations.length > 0 ? (
				<Reservations
					modalOpen={isModalOpen}
					dataReservations={dataReservations}
					changeModal={setIsModalOpen}
					changeIndiReservations={setIndiReservations}
					setDataReserve={setDataReservations}
				/>
			) : (
				<EmptyReservationsMessage />
			)}

			<ModalCheckReservations
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={`Reservas del ${indiReservations ? revertDate(indiReservations[0].date) : ''}`}>
				<Reservations
					modalOpen={isModalOpen}
					dataReservations={indiReservations}
					setDataReserve={setDataReservations}
					changeIndiReservations={setIndiReservations}
				/>
			</ModalCheckReservations>
		</div>
	);
};

export { CheckReservations };
