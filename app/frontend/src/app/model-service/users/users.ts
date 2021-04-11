import { Token } from './tokens';

export class User {
  username: string;
  token: Token;
  is_admin: boolean;
  is_webadmin: boolean;
}