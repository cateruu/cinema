import Link from 'next/link';
import React from 'react';
import { Room } from '../../../../../types/room';
import { Armchair, CornerUpLeft } from 'lucide-react';
import RoomForm from '../../../../../components/RoomForm/RoomForm';

type Params = {
  params: Promise<{ id: string }>;
};

const EditRoomPage = async ({ params }: Params) => {
  const id = (await params).id;

  const resp = await fetch(`${process.env.API_URL}/v1/rooms/${id}`);

  if (!resp.ok) {
    return (
      <section className='w-full h-full flex flex-col items-center justify-center p-3 xl:p-8'>
        <h2 className='text-xl text-center'>Unable to fetch the room.</h2>
        <Link href='/dashboard' className='text-orange-400 font-medium'>
          Go back
        </Link>
      </section>
    );
  }

  const room = (await resp.json()) as Room;

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
      <RoomForm isEditMode room={room} />
    </main>
  );
};

export default EditRoomPage;
