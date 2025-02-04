export class AddEditUsersForm {
  dni: string;
  name: string;
  email: string;
  pass1: string;
  pass2: string;

  constructor(
    {
      dni, email,
      name, pass1, pass2
    }: Partial<AddEditUsersForm> = {}
  ) {
    this.dni = dni || '';
    this.name = name || '';
    this.email = email || '';
    this.pass1 = pass1 || '';
    this.pass2 = pass2 || '';
  }
}
