export type DeviceStatus = 'AVAILABLE' | 'UNDER_REPAIR' | 'IN_USE';

export interface Device {
	id?: number;
	inventoryId?: number;
	name: string;
	description: string;
	category: string;
	status: DeviceStatus;
}
