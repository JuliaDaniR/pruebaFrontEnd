import React, { useState } from 'react';
import { useGetCurrentRoute } from '../../../helpers/hooks/useGetCurrentRoute';
import { Route } from '../../../helpers/Route';

const NavbarCurrentRoute = () => {
	const getCurrentRoute = useGetCurrentRoute;
	const [currentRoute, setCurrentRoute] = useState<Route | undefined>();

	const handleCurrentUpdateRoute = (route: Route | undefined) => {
		setCurrentRoute(route);
	};

	getCurrentRoute({
		onUpdateCurrentRoute: handleCurrentUpdateRoute,
	});

	return (
		<React.Fragment>
			<div
				className='
          hidden
          md:block md:content-center md:text-xl
        '>
				{currentRoute?.name}
			</div>
		</React.Fragment>
	);
};

export { NavbarCurrentRoute };
