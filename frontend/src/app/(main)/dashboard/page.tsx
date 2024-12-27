import React from 'react';
import { verifySession } from '../../../actions/verifySession';
import { redirect } from 'next/navigation';
import { UserRoles } from '../../../types/auth';
import ButtonHeader from '../../../components/Dashboard/ButtonHeader/ButtonHeader';
import SectionSelect from '../../../components/Dashboard/SectionSelect/SectionSelect';

const DashboardPage = async () => {
  const user = await verifySession();

  if (!user || !user.roles.includes(UserRoles.ADMIN)) {
    redirect('/');
  }

  return (
    <main className='font-[family-name:var(--font-poppins)] w-full h-full lg:ml-20 xl:ml-0'>
      <ButtonHeader />
      <SectionSelect />
    </main>
  );
};

export default DashboardPage;
