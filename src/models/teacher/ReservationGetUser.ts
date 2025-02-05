export interface Reservation {
	reserveId?: number;
	startDate?: string;
	date?: string;
	reservationShiftStatus: string;
	selectedTimeSlot: string;
	resourceId: number;
	resourceName?: string;
	reservationStatus?: string;
	mergedReserves?: Reservation[];
}
export interface ReservationSimple {
	startDate: string;
	reservationShiftStatus: string;
	selectedTimeSlot: string;
	resourceId: number;
}

export interface ReservationResponse {
	data: {
		content: Reservation[] | ReservationSimple[];
		totalPages: number;
		totalElements: number;
		size: number;
		number: number;
	};
	message: string;
	status: string;
}

export interface ReservationData {
	userName: string;
	date: string;
	reservationShiftStatus: 'MANANA' | 'TARDE' | 'NOCHE';
	selectedTimeSlot: string;
	resourceName: string;
	reservationStatus: 'CONFIRMED' | 'FINISHED' | 'CANCELLED';
}

export interface CreateReservationResponse {
	data: ReservationData;
	message: string;
	status: 'success' | 'error';
}
