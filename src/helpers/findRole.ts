import { Route } from './Route';

export const findPathByRouteType = (routeList: Route[], routeType: string) => {
	return routeList.find((route) => route.routeType === routeType)?.path;
};
