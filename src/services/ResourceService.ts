import { useState } from 'react';
import { PORT_SERVER } from '.';
import { useGetCurrentUser } from '../helpers/hooks/useGetCurrentUser';
import { LoginResponse } from '../context/user';
import axios, { AxiosRequestConfig } from 'axios';
import { headersWithToken } from '../helpers/headersWithToken';
import { Device } from '../models/Device';

const DeviceService = () => {
	// Custom Hooks
	const getCurrentUser = useGetCurrentUser;

	// States
	const [currentUser, setCurrentUser] = useState<LoginResponse | null>(null);

	// Handlers
	const handleUser = (user: LoginResponse | null) => {
		if (currentUser?.jwtToken !== user?.jwtToken) {
			setCurrentUser(user ? user : null);
		}
	};

	const getAllDeviceRequestSize = 8;

	// Effects
	getCurrentUser({ onUpdateUser: handleUser });

	return {
		getAllDevices: async (page?: number) => {
			const url = `${PORT_SERVER}/resource/allResources`;
			if (!currentUser) throw new Error('Usuario no logueado');
			const config: AxiosRequestConfig = {
				...headersWithToken(currentUser.jwtToken),
				params: {
					page,
					size: getAllDeviceRequestSize,
				},
			};
			const response = await axios.get(url, config);
			return response.data.data;
		},

		getDeviceById: async (id: number) => {
			const url = `${PORT_SERVER}/resource/getById/${id}`;
			if (!currentUser) throw new Error('Usuario no logueado');
			const config = headersWithToken(currentUser.jwtToken);
			const response = await axios.get(url, config);
			return response.data.data;
		},

		createDevice: async (device: Device) => {
			const url = `${PORT_SERVER}/resource/add-resource`;
			const data = { ...device };
			if (!currentUser) throw new Error('Usuario no logueado');
			const config = headersWithToken(currentUser.jwtToken);
			await axios.post(url, data, config);
		},

		updateDevice: async (device: Device) => {
			const url = `${PORT_SERVER}/resource/update/${device.id}`;
			const data = { ...device };
			if (!currentUser) throw new Error('Usuario no logueado');
			const config = headersWithToken(currentUser.jwtToken);
			await axios.put(url, data, config);
		},

		deleteDeviceById: async (id: number) => {
			const url = `${PORT_SERVER}/resource/delete/${id}`;
			if (!currentUser) throw new Error('Usuario no Existente');
			const config = headersWithToken(currentUser.jwtToken);
			await axios.delete(url, config);
		},
	};
};

export { DeviceService };
