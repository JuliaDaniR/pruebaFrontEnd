import { Route } from './Route';
import { AdminDashboard } from '../pages/AdminDashboard/AdminDashboard';
import { TeacherDashboard } from '../pages/TeacherDashboard';
import { Users } from '../pages/Users/Users';
import { Inventory } from '../pages/Inventory/Inventory';
import { AddEditUsers } from '../pages/AddEditUsers/AddEditUsers';
import { AddEditDevice } from '../pages/AddEditDevice/AddEditDevice';
import { SearchDevices } from '../pages/SearchDevices/SearchDevices';
import { CheckReservations } from '../pages/CheckReservations/CheckReservations';
import { NewReservation } from '../pages/NewReservation/NewReservation';
import { EditAdmin } from '../pages/EditAdmin/EditAdmin';
import { TermsAndConditions } from '../pages/TermsAndConditions/TermsAndConditions';
import { EditReservation } from '../pages/EditReservations/EditReservation';
import { AddNewReservation } from '../pages/AddNewReservation/AddNewReservation';

const routeList: Route[] = [
	{
		path: '/admin-dashboard',
		name: 'Home',
		routeType: 'admin',
		isShownInMenu: true,
		element: AdminDashboard,
	},
	{
		path: '/edit-admin-profile',
		name: 'Editar Admin',
		routeType: 'admin',
		isShownInMenu: false,
		element: EditAdmin,
	},
	{
		path: '/users',
		name: 'Administrar Usuarios',
		routeType: 'admin',
		isShownInMenu: true,
		element: Users,
	},
	{
		path: '/inventory',
		name: 'Administrar Inventario',
		routeType: 'admin',
		isShownInMenu: true,
		element: Inventory,
	},
	{
		path: '/add-user',
		name: 'Agregar Usuario',
		routeType: 'admin',
		isShownInMenu: false,
		element: AddEditUsers,
	},
	{
		path: '/edit-user/:dni',
		name: 'Editar Usuario',
		routeType: 'admin',
		isShownInMenu: false,
		element: AddEditUsers,
	},
	{
		path: '/add-device',
		name: 'Agregar Dispositivo',
		routeType: 'admin',
		isShownInMenu: false,
		element: AddEditDevice,
	},
	{
		path: '/edit-device/:id',
		name: 'Editar Dispositivo',
		routeType: 'admin',
		isShownInMenu: false,
		element: AddEditDevice,
	},

	{
		path: '/teacher-dashboard/:page?',
		name: 'Home',
		routeType: 'teacher',
		isShownInMenu: true,
		element: TeacherDashboard,
	},
	{
		path: '/search-device',
		name: 'Ver dispositivos',
		routeType: 'teacher',
		isShownInMenu: true,
		element: SearchDevices,
	},
	{
		path: '/check-reservations',
		name: 'Ver mis reservas',
		routeType: 'teacher',
		isShownInMenu: true,
		element: CheckReservations,
	},
	{
		path: '/new-reservations',
		name: 'Nueva Reserva',
		routeType: 'teacher',
		isShownInMenu: true,
		element: AddNewReservation,
	},
	{
		path: '/edit-reservation/:id?',
		name: 'Editar Reserva',
		routeType: 'teacher',
		isShownInMenu: false,
		element: EditReservation,
	},
	{
		path: '/add-reservation',
		name: 'Reservar Dispositivo',
		routeType: 'teacher',
		isShownInMenu: false,
		element: NewReservation,
	},
	{
		path: '/conditions',
		name: 'Términos y Condiciones',
		routeType: 'logged',
		isShownInMenu: true,
		element: TermsAndConditions,
	},
] as const;

export { routeList };
