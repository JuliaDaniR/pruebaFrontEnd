import { useEffect } from 'react';
import { useAuthProvider } from '../../context/AuthProvider';
import { LoginResponse } from '../../context/user';

interface useGetCurrentUserProps {
  onUpdateUser: (
    tokenValue: LoginResponse | null
  ) => void;
}

const useGetCurrentUser = (
  { onUpdateUser }: useGetCurrentUserProps
) => {
  const context = useAuthProvider();

  useEffect(() => {
    onUpdateUser(context.user);
  }, [onUpdateUser, context]);
}

export {
  useGetCurrentUser,
}