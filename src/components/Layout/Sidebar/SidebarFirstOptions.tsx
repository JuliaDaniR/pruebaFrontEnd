import React, { useState } from 'react';
import { Route } from '../../../helpers/Route';
import { UseGetMenuRoutesForRoleUser } from '../../../helpers/hooks/useGetMenuRoutesForRoleUser';
import { useNavigate } from 'react-router-dom';

interface SidebarFirstOptionsProps {
	optionClasses: string;
}

const SidebarFirstOptions = ({ optionClasses }: SidebarFirstOptionsProps) => {
	const navigate = useNavigate();
	const getMenuRoutesForRoleUser = UseGetMenuRoutesForRoleUser;

	const [routes, setRoutes] = useState<Route[]>([]);

	const handleRoutesUpdate = (newRoutes: Route[]) => {
		setRoutes(newRoutes);
	};

	getMenuRoutesForRoleUser({ onUpdateRoutes: handleRoutesUpdate });

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
			</div>
		</React.Fragment>
	);
};

export { SidebarFirstOptions };
