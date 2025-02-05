import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthProvider } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import { routeList } from '../helpers/routeList';

interface ProtectedRouteProps {
	children: ReactNode;
}

const PrivateRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user, logoutIntentional } = useAuthProvider();
	const location = useLocation();

	// Busca la ruta actual en routeList para determinar su tipo
	const currentRoute = routeList.find((route) => {
		const data = route.path.match(location.pathname.split('/')[1]);
		return data;
	});

	if (currentRoute && !user && !logoutIntentional) {
		Swal.fire({
			icon: 'warning',
			title: '¡Acceso denegado!',
			text: 'Debes iniciar sesión para acceder a esta página.',
			confirmButtonText: 'Aceptar',
		});

		return <Navigate to='/login' />;
	}

	if (
		currentRoute &&
		currentRoute.routeType !== user?.role &&
		currentRoute.routeType !== 'USER'
	) {
		Swal.fire({
			icon: 'error',
			title: 'Acceso restringido',
			text: 'No tienes permisos para acceder a esta página.',
			confirmButtonText: 'Aceptar',
		});
		return <Navigate to='/login' />;
	}

	return <>{children}</>;
};

export default PrivateRoute;
