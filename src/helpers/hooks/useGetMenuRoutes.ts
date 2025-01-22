import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Route } from '../Route';
import { routeList } from '../routeList';
import { RouteType } from '../RolesType';

interface UseGetMenuRoutesProps {
	menuType?: RouteType;
	onUpdateRoutes: (routes: Route[]) => void;
}

const UseGetMenuRoutes = ({
	menuType = 'teacher',
	onUpdateRoutes,
}: UseGetMenuRoutesProps) => {
	const location = useLocation();
	const [prevRoutes, setPrevRoutes] = useState<Route[]>([]);

	useEffect(() => {
		const routesToShow = routeList.filter(
			(route) => route.routeType == menuType && route.isShownInMenu,
		);
		const isDifferent =
			JSON.stringify(routesToShow) !== JSON.stringify(prevRoutes);
		if (isDifferent) {
			onUpdateRoutes(routesToShow);
			setPrevRoutes(routesToShow);
		}
	}, [location.pathname, menuType, onUpdateRoutes, prevRoutes]);
};

export { UseGetMenuRoutes };
