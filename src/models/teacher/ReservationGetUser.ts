export interface Reservation {
	reserveId: number;
	date: string;
	reservationShiftStatus: string;
	selectedTimeSlot: string;
	resourceId: number;
	resourceName: string;
	reservationStatus: string;
	mergedReserves?: Reservation[];
}

export interface ReservationResponse {
	data: {
		content: Reservation[];
		totalPages: number;
		totalElements: number;
		size: number;
		number: number;
	};
	message: string;
	status: string;
}

export interface ReservationSimple {
	startDate: string;
	reservationShiftStatus: string;
	selectedTimeSlot: string;
	resourceId: number;
}
