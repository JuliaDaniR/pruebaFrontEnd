import { useEffect, useState } from 'react';
import { Route } from '../Route';
import { ExperimentalUser } from '../../models/ExperimentalUser';
import { UseGetCurrentUser } from './useGetCurrentUserExperimental';
import { UseGetMenuRoutes } from './useGetMenuRoutes';

interface UseGetMenuRoutesForRoleUserProps {
	onUpdateRoutes: (routes: Route[]) => void;
}

const UseGetMenuRoutesForRoleUser = ({
	onUpdateRoutes,
}: UseGetMenuRoutesForRoleUserProps) => {
	const getCurrentUser = UseGetCurrentUser;
	const getMenuRoutes = UseGetMenuRoutes;

	const [routes, setRoutes] = useState<Route[]>([]);
	const [user, setUser] = useState<ExperimentalUser>({
		name: '',
		role: 'admin',
	});

	const handleUserUpdate = ({ name, role }: ExperimentalUser) => {
		setUser({ name, role });
	};
	const handleMenuUpdate = (newRoutes: Route[]) => {
		setRoutes(newRoutes);
	};

	getCurrentUser({ onUpdateUser: handleUserUpdate });

	getMenuRoutes({
		menuType: user.role,
		onUpdateRoutes: handleMenuUpdate,
	});

	useEffect(() => {
		onUpdateRoutes(routes);
	}, [routes, user, onUpdateRoutes]);
};

export { UseGetMenuRoutesForRoleUser };
