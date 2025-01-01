import React from 'react';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import { Room } from '@/types/room';
import DeleteConfirmationModal from './DeleteConfirmationModal/DeleteConfirmationModal';

interface Props {
  room: Room;
}

const RoomElement = ({ room }: Props) => {
  return (
    <div className='w-full bg-slate-950 rounded-xl p-3'>
      <p className='text-xl font-medium'>{room.name}</p>
      <div className='flex justify-between'>
        <p className='text-slate-600'>Capacity:</p>
        <p>{room.capacity}</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-slate-600'>Rows:</p>
        <p>{room.rows}</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-slate-600'>Seats:</p>
        <p>{room.seats}</p>
      </div>
      <div className='flex items-center justify-center gap-2 mt-3'>
        <Link
          href={`/dashboard/edit-room/${room.id}`}
          className='flex items-center justify-center gap-1 text-slate-600 text-sm transition-colors hover:text-green-600 flex-grow'
        >
          <Edit size={16} /> Edit
        </Link>
        <DeleteConfirmationModal roomId={room.id} roomName={room.name} />
      </div>
    </div>
  );
};

export default RoomElement;
