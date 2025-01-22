import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthProvider } from '../context/AuthProvider';
import Swal from 'sweetalert2';

interface ProtectedRouteProps {
	children: ReactNode;
}

const PrivateRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user } = useAuthProvider();

	if (!user || user.role !== 'ADMIN') {
		Swal.fire({
			icon: 'warning',
			title: '¡Acceso denegado!',
			text: 'Debes iniciar sesión para acceder a esta página.',
			confirmButtonText: 'Aceptar',
		});

		// Redirige al login en caso de no estar logueado
		return <Navigate to='/login' />;
	}

	return <>{children}</>;
};

export default PrivateRoute;
