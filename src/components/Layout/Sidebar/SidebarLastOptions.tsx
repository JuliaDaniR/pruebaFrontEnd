import React, { useState } from 'react';
import { UseGetMenuRoutes } from '../../../helpers/hooks/useGetMenuRoutes';
import { Route } from '../../../helpers/Route';

interface SidebarLastOptionsProps {
	optionClasses: string;
}
const SidebarLastOptions = ({ optionClasses }: SidebarLastOptionsProps) => {
	const getMenuRoutes = UseGetMenuRoutes;

	const [routes, setRoutes] = useState<Route[]>([]);

	const handleRoutesUpdate = (newRoutes: Route[]) => {
		setRoutes(newRoutes);
	};

	getMenuRoutes({ onUpdateRoutes: handleRoutesUpdate, menuType: 'logged' });

	return (
		<React.Fragment>
			<div>
				{routes.map((route) => {
					return (
						<div key={route.path} className={optionClasses}>
							{route.name}
						</div>
					);
				})}
				<div className={optionClasses}>Salir</div>
			</div>
		</React.Fragment>
	);
};

export { SidebarLastOptions };
