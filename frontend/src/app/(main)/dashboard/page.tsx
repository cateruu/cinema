import React from 'react';
import { verifySession } from '../../../actions/verifySession';
import { redirect } from 'next/navigation';
import { UserRoles } from '../page';

const DashboardPage = async () => {
  const user = await verifySession();

  if (!user || !user.roles.includes(UserRoles.ADMIN)) {
    redirect('/');
  }

  return <div>DashboardPage</div>;
};

export default DashboardPage;
