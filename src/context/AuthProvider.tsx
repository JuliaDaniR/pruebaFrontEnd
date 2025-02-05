/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import { AuthContextType, LoginResponse, UserCredentials } from './user';
import loginRequest from '../services/loginRequest';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// contexto para manejar el estado del usuario
const AuthProvider = createContext<AuthContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [logoutIntentional, setLogoutIntentional] = useState<boolean>(false);

	const [user, setUser] = useState<LoginResponse | null>(() => {
		const storedUser = localStorage.getItem('user');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	const navigate = useNavigate();

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedTimestamp = localStorage.getItem('timestamp');
		if (user && storedTimestamp) {
			const now = new Date().getTime();
			const timeElapsed = now - parseInt(storedTimestamp);

			if (timeElapsed > 1 * 60 * 60 * 1000 || !user) {
				setUser(null);
				setIsLoggedIn(false);
				localStorage.removeItem('user');
				localStorage.removeItem('timestamp');
				setLogoutIntentional(true);
			}
			if (user) {
				setIsLoggedIn(true);
				setLogoutIntentional(false);
			}
		}
	}, [user]);

	const loginUser = async (
		userData: UserCredentials,
	): Promise<LoginResponse> => {
		try {
			const response = await loginRequest(userData);

			if (response) {
				setUser(response);
				setIsLoggedIn(true);
				setLogoutIntentional(false);
				localStorage.setItem('logoutIntentional', JSON.stringify(false));
				localStorage.setItem('user', JSON.stringify(response));
				localStorage.setItem('timestamp', new Date().getTime().toString());
				return response;
			} else {
				console.error('No se recibió respuesta válida del servidor.');
				throw new Error('No se recibió respuesta válida del servidor.');
			}
		} catch (error) {
			console.error(error || 'Error desconocido durante el inicio de sesión.');
			throw error;
		}
	};

	const logout = () => {
		Swal.fire({
			title: '¿Estás seguro?',
			text: 'Se cerrará tu sesión.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#fb923c',
			confirmButtonText: 'Sí, cerrar sesión',
			customClass: {
				popup: 'custom-swal-popup',
			},
		}).then((result) => {
			if (result.isConfirmed) {
				setLogoutIntentional(true);

				setTimeout(() => {
					setUser(null);
					setIsLoggedIn(false);
					localStorage.removeItem('user');
					localStorage.removeItem('timestamp');
				}, 5000);

				navigate('/login');
			}
		});
	};

	return (
		<AuthProvider.Provider
			value={{ user, isLoggedIn, loginUser, logout, logoutIntentional }}>
			{children}
		</AuthProvider.Provider>
	);
}

export const useAuthProvider = () => {
	const context = useContext(AuthProvider);
	if (!context) {
		throw new Error('useAuthProvider debe usarse dentro de un AuthProvider');
	}
	return context;
};
