export const UserRoles = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export interface UserSession {
  valid: boolean;
  username: string;
  roles: string[];
}
