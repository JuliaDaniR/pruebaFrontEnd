import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Route } from '../Route';
import { routeList } from '../routeList';
import { LoginRole } from '../../context/user';

interface UseGetMenuRoutesProps {
	menuType?: LoginRole;
	onUpdateRoutes: (routes: Route[]) => void;
}

const UseGetMenuRoutes = ({
	menuType = 'TEACHER',
	onUpdateRoutes,
}: UseGetMenuRoutesProps) => {
	const location = useLocation();
	const [prevRoutes, setPrevRoutes] = useState<Route[]>([]);

	useEffect(() => {
		const routesToShow = routeList.filter(
			(route) => route.routeType == menuType && route.isShownInMenu,
		);
		if (JSON.stringify(prevRoutes) !== JSON.stringify(routesToShow)) {
			onUpdateRoutes(routesToShow);
			setPrevRoutes(routesToShow);
		}
	}, [location.pathname, menuType, onUpdateRoutes, prevRoutes]);
};

export { UseGetMenuRoutes };
