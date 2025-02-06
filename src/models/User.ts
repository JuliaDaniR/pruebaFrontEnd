export interface User {
  dni: string,
  email: string,
  full_name: string,

  password: string,
  password2: string,
  institution_cue?: string,

  fullName?: string,
  role?: 'TEACHER' | 'ADMIN',
  nameSchool?: string,
}
