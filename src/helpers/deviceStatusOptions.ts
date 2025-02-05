import { DeviceStatus } from '../models/Device';
import { MultipleFormControlOption } from './MultipleFormControlOption';

export const deviceStatusOptions: MultipleFormControlOption<DeviceStatus>[] = [
  {
    commonName: 'Si',
    value: 'AVAILABLE',
  },
  {
    commonName: 'En uso',
    value: 'IN_USE',
  },
  {
    commonName: 'En reparación',
    value: 'UNDER_REPAIR',
  },
] as const;
