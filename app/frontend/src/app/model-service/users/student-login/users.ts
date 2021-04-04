import { StudentToken } from './tokens';

export class StudentUser {
  username: string; //email
  token: StudentToken;
  is_admin: boolean;
}