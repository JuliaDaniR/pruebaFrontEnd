export class UserRegister {
  cue: string;
  name: string;
  educational_level: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  dniAdmin: string;
  full_name_admin: string;
  email_admin: string;
  password_admin?: string;
  password2_admin?: string;

  constructor({
    cue,
    name,
    educational_level,
    address,
    email,
    phone,
    website,
    dniAdmin,
    full_name_admin,
    email_admin,
    password_admin,
    password2_admin,
  }: UserRegister) {
    this.cue = cue;
    this.name = name;
    this.educational_level = educational_level;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.website = website;
    this.dniAdmin = dniAdmin;
    this.full_name_admin = full_name_admin;
    this.email_admin = email_admin;
    this.password_admin = password_admin;
    this.password2_admin = password2_admin;
  }
}