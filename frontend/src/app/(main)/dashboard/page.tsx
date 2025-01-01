import React from 'react';
import { redirect } from 'next/navigation';
import { verifySession } from '@/actions/verifySession';
import { UserRoles } from '@/types/auth';
import ButtonHeader from '@/components/Dashboard/ButtonHeader/ButtonHeader';
import SectionSelect from '@/components/Dashboard/SectionSelect/SectionSelect';
import Content from '@/components/Dashboard/Content/Content';
import { DashboardSections } from '@/types/dashboard';

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const DashboardPage = async (props: { searchParams: SearchParams }) => {
  const user = await verifySession();
  const searchParams = await props.searchParams;

  if (!user || !user.roles.includes(UserRoles.ADMIN)) {
    redirect('/');
  }

  return (
    <main className='font-[family-name:var(--font-poppins)] w-full h-full lg:ml-20 xl:ml-0'>
      <ButtonHeader />
      <SectionSelect />
      <Content
        activeSection={searchParams.section || DashboardSections.MOVIES}
      />
    </main>
  );
};

export default DashboardPage;
