'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { verifySession } from '../actions/verifySession';

export const UserContext = createContext<UserSession | null>(null);

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await verifySession();

      setUser(user);
    };

    getUserInfo();
  }, []);

  return <UserContext value={user}>{children}</UserContext>;
};
