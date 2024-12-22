export const UserRoles = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export interface UserSession {
  id: string;
  valid: boolean;
  username: string;
  roles: string[];
}
