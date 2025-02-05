import React from 'react';
import { LoginRole } from '../context/user';

export interface Route {
	path: string;
	name: string;
	isShownInMenu: boolean;
	routeType: LoginRole;
	element: React.FC;
}
