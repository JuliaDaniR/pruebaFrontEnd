import React from 'react';
import { RouteType } from './RolesType';

export interface Route {
	path: string;
	name: string;
	isShownInMenu: boolean;
	routeType: RouteType;
	element: React.FC;
}
