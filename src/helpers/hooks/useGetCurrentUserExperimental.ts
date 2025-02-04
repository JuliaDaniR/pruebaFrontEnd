// TODO: Darle la logica real para verificar usuarios

import { useEffect, useState } from 'react';
import { RouteType } from '../RolesType';
import { ExperimentalUser } from '../../models/ExperimentalUser';

interface UseGetCurrentUserProps {
	onUpdateUser: (user: ExperimentalUser) => void;
}

const UseGetCurrentUser = ({ onUpdateUser }: UseGetCurrentUserProps) => {
	const [currentRole, setCurrentRole] = useState<RouteType>('teacher');
	const [currentName, setCurrentName] = useState<string>('German');

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentRole((prevRole) => (prevRole == 'admin' ? 'teacher' : 'admin'));
			setCurrentName((prevName) =>
				prevName == 'admin' ? 'German' : 'DocenteName',
			);
			onUpdateUser({ name: currentName, role: currentRole });
			return null;
		}, 2000);
		return () => clearInterval(interval);
	}, [onUpdateUser, currentRole, currentName]);
};

export { UseGetCurrentUser };
