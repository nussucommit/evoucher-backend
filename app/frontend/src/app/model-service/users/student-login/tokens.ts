export interface StudentToken {
    access: string;
    refresh: string;
    is_admin: boolean;
    is_webadmin: boolean;
  }

export interface StudentDetails {
  username: string;
  token: any;
}