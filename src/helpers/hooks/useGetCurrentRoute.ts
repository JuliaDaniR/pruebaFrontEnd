import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routeList } from '../routeList';
import { Route } from '../Route';

interface UseGetCurrentRouteProps {
	onUpdateCurrentRoute: (route: Route | undefined) => void;
}

const useGetCurrentRoute = ({
	onUpdateCurrentRoute,
}: UseGetCurrentRouteProps) => {
	const location = useLocation();

	useEffect(() => {
		const foundRoute = routeList.find(
			(route) => route.path == location.pathname,
		);
		onUpdateCurrentRoute(foundRoute);
	}, [location.pathname, onUpdateCurrentRoute]);
};

export { useGetCurrentRoute };
