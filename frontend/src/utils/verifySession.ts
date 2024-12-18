'use server';

import { cookies } from 'next/headers';
import { cache } from 'react';

interface UserSession {
  valid: boolean;
  username: string;
  roles: string[];
}

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  const resp = await fetch(`${process.env.API_URL}/v1/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!resp.ok) {
    return null;
  }

  const data = (await resp.json()) as UserSession;
  data['roles'] = data.roles.map((role) => role.split('_')[1].toLowerCase());

  return data;
});
