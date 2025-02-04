import React, { useEffect, useState } from 'react';
import { useAuthProvider } from '../../context/AuthProvider';
import { AdminHomeTitle } from '../AdminDashboard/AdminHomeTitle';
import { TeacherHomeData } from './TeacherHomeData';
import { CheckReservations } from '../CheckReservations/CheckReservations';

const TeacherDashboard = () => {
	const { user } = useAuthProvider();
	const [userName, setUserName] = useState(user?.name);

	useEffect(() => {
		setUserName(userName);
	}, [userName]);

	return (
		<React.Fragment>
			<AdminHomeTitle>¡Bienvenido, {userName}!</AdminHomeTitle>
			<TeacherHomeData />
			<CheckReservations />
		</React.Fragment>
	);
};

export { TeacherDashboard };
