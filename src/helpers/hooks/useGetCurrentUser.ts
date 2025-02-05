import { useEffect, useState } from 'react';
import { useAuthProvider } from '../../context/AuthProvider';
import { LoginResponse } from '../../context/user';

interface useGetCurrentUserProps {
	onUpdateUser: (loginResponse: LoginResponse | null) => void;
}

const useGetCurrentUser = ({ onUpdateUser }: useGetCurrentUserProps) => {
	const [loggedUser, setLoggedUser] = useState<LoginResponse | null>();

	const { user } = useAuthProvider();

	useEffect(() => {
		if (!loggedUser || JSON.stringify(loggedUser) !== JSON.stringify(user)) {
			setLoggedUser(user);
			onUpdateUser(user);
		}
	}, [user, onUpdateUser, loggedUser]);
};

export { useGetCurrentUser };
