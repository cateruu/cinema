import { Armchair, CornerUpLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { verifySession } from '@/actions/verifySession';
import { UserRoles } from '@/types/auth';
import { redirect } from 'next/navigation';
import RoomForm from '@/components/RoomForm/RoomForm';

const AddRoomPage = async () => {
  const user = await verifySession();

  if (!user || !user.roles.includes(UserRoles.ADMIN)) {
    redirect('/');
  }

  return (
    <main className='font-[family-name:var(--font-poppins)] w-full h-full lg:ml-20 xl:ml-0'>
      <Link
        href='/dashboard'
        className='flex align items-center gap-1 text-sm text-slate-600 transition-colors hover:text-orange-50 pl-3 pt-3'
      >
        <CornerUpLeft size={12} /> Go back
      </Link>
      <h2 className='flex items-center gap-2 text-xl p-3 font-bold'>
        <Armchair size={20} /> Add room
      </h2>
      <RoomForm />
    </main>
  );
};

export default AddRoomPage;
