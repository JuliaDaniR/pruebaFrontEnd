import React, { useEffect, useRef, useState } from 'react';
import { UseReservations } from '../../helpers/hooks/UseReservations';
import { Reservation } from '../../models/teacher/ReservationGetUser';
import ModalCheckReservations from './ModalCheckReservations';
import { Reservations } from './Reservations';
import { revertDate } from '../../utils/stringReverse';

const CheckReservations: React.FC = () => {
	const [dataReservations, setDataReservations] = useState<
		Reservation[] | null
	>(null);
	const [indiReservations, setIndiReservations] = useState<
		Reservation[] | null
	>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { getReservationTeacher, mergeConsecutiveReservations } =
		UseReservations();

	const prevReservationsRef = useRef<Reservation[] | null>(null);

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

	console.log(indiReservations);

	return (
		<div className='bg-gray-100 shadow-md rounded border border-gray-200 px-8 pt-8 pb-8 mb-4 m-8'>
			<h2 className='text-4xl font-medium leading-6 text-sky-600 mb-4'>
				Mis Reservas
			</h2>
			<Reservations
				modalOpen={isModalOpen}
				dataReservations={dataReservations}
				changeModal={setIsModalOpen}
				changeIndiReservations={setIndiReservations}
				setDataReserve={setDataReservations}
			/>
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
