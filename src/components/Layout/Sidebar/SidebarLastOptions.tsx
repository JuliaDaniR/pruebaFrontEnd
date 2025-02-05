import React, { useState } from 'react';
import { UseGetMenuRoutes } from '../../../helpers/hooks/useGetMenuRoutes';
import { Route } from '../../../helpers/Route';
import { useAuthProvider } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface SidebarLastOptionsProps {
	optionClasses: string;
}
const SidebarLastOptions = ({ optionClasses }: SidebarLastOptionsProps) => {
	const navigate = useNavigate();
	const getMenuRoutes = UseGetMenuRoutes;
	const { logout } = useAuthProvider();

	const [routes, setRoutes] = useState<Route[]>([]);

	const handleRoutesUpdate = (newRoutes: Route[]) => {
		setRoutes(newRoutes);
	};

	getMenuRoutes({ onUpdateRoutes: handleRoutesUpdate, menuType: 'USER' });

	const onClickRoute = (path: string) => {
		navigate(path);
	};

	return (
		<React.Fragment>
			<div>
				{routes.map((route) => {
					return (
						<div
							key={route.path}
							className={optionClasses}
							onClick={() => onClickRoute(route.path)}>
							{route.name}
						</div>
					);
				})}
				<div className={optionClasses} onClick={logout}>
					Salir
				</div>
			</div>
		</React.Fragment>
	);
};

export { SidebarLastOptions };
