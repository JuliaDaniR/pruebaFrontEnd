import { useEffect, useState } from 'react';
import { Route } from '../Route';
import { UseGetMenuRoutes } from './useGetMenuRoutes';
import { useGetCurrentUser } from './useGetCurrentUser';
import { LoginResponse } from '../../context/user';

interface UseGetMenuRoutesForRoleUserProps {
	onUpdateRoutes: (routes: Route[]) => void;
}

const emptyUser: LoginResponse = {
	dni: '0',
	jwtToken: '',
	name: '',
	role: 'USER',
};

const UseGetMenuRoutesForRoleUser = ({
	onUpdateRoutes,
}: UseGetMenuRoutesForRoleUserProps) => {
	const getCurrentUser = useGetCurrentUser;
	const getMenuRoutes = UseGetMenuRoutes;

	const [routes, setRoutes] = useState<Route[]>([]);
	const [user, setUser] = useState<LoginResponse | null>({ ...emptyUser });

	const handleUserUpdate = (loggedUser: LoginResponse | null) => {
		setUser(loggedUser);
	};

	const handleMenuUpdate = (newRoutes: Route[]) => {
		setRoutes(newRoutes);
	};

	getCurrentUser({ onUpdateUser: handleUserUpdate });

	getMenuRoutes({
		menuType: user?.role || 'USER',
		onUpdateRoutes: handleMenuUpdate,
	});

	useEffect(() => {
		onUpdateRoutes(routes);
	}, [routes, user, onUpdateRoutes]);
};

export { UseGetMenuRoutesForRoleUser };
