import { RouteType } from '../helpers/RolesType';

export class ExperimentalUser {
  role: RouteType;
  name: string;

  constructor() {
    this.role = 'admin';
    this.name = 'Gemrna';
  }
}