import { MultipleFormControlOption } from './MultipleFormControlOption';
import { UserRoles } from './UserRoles';

export const roleControlOptions: MultipleFormControlOption<UserRoles>[] = [
  {
    commonName: 'Administrador',
    value: 'ADMIN',
  },
  {
    commonName: 'Docente',
    value: 'TEACHER',
  },
]