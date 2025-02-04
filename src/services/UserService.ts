import { useState } from 'react';
import { PORT_SERVER } from '.';
import { useGetCurrentUser } from '../helpers/hooks/useGetCurrentUser';
import { User } from '../models/User';
import { LoginResponse } from '../context/user';
import axios, { AxiosRequestConfig } from 'axios';
import { headersWithToken } from '../helpers/headersWithToken';

interface CreateUserProps {
	user: User;
}
interface GetUserByDniProps {
	dni: string;
}

const UserService = () => {
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

	// Effects
	getCurrentUser({ onUpdateUser: handleUser });

	const getAllUsersRequestSize = 6;


	return {
		getAllUsers: async (page: number) => {
			const url = `${PORT_SERVER}/user/getAll`;
			if (!currentUser) throw new Error('Usuario no Existente');
			const config: AxiosRequestConfig = {
				...headersWithToken(currentUser.jwtToken),
				params: {
					page, size: getAllUsersRequestSize
				}
			};
			const response = await axios.get(url, config);
			return response.data.data;
		},

		getUserByDni: async ({ dni }: GetUserByDniProps) => {
			const url = `${PORT_SERVER}/user/getDni/${dni}`;
			if (!currentUser) throw new Error('Usuario no Existente');
			const config = headersWithToken(currentUser.jwtToken);
			const response = await axios.get(url, config);
			return response.data.data;
		},

		createUser: async ({ user }: CreateUserProps) => {
			const url = `${PORT_SERVER}/user/register`;
			const data = { ...user };
			if (!currentUser) throw new Error('Usuario no logueado');
			const config = headersWithToken(currentUser.jwtToken);
			await axios.post(url, data, config);
		},

		updateUser: async ({ user }: CreateUserProps) => {
			const url = `${PORT_SERVER}/user/update`;
			const data = { ...user };
			if (!currentUser) throw new Error('Usuario no logueado');
			const config = headersWithToken(currentUser.jwtToken);
			await axios.put(url, data, config);
		},

		deleteUserByDni: async (dni: string) => {
			const url = `${PORT_SERVER}/user/delete/${dni}`;
			if (!currentUser) throw new Error('Usuario no Existente');
			const config = headersWithToken(currentUser.jwtToken);
			await axios.delete(url, config);
		},
	};
};

export { UserService };
