import React from 'react';
import { Movie } from '../../../../types/movies';
import Image from 'next/image';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import DeleteConfirmationModal from './DeleteConfirmationModal/DeleteConfirmationModal';

interface Props {
  movie: Movie;
}

const MovieElement = ({ movie }: Props) => {
  return (
    <div className='group w-full p-3 flex flex-col rounded-xl overflow-hidden bg-slate-950'>
      <Image
        src={movie.thumbnailUrl}
        alt={`${movie.name} poster`}
        width={500}
        height={500}
        className='aspect-square object-cover rounded-lg w-full'
      />
      <section className='mt-3 relative'>
        <p className='text-xl font-medium'>{movie.name}</p>
        <div className='absolute bottom-1 right-0 bg-slate-950 pl-1 items-center gap-3 hidden group-hover:flex'>
          <Link
            href='/dashboard/edit-movie'
            className='flex items-center gap-1 text-slate-600 text-sm transition-colors hover:text-green-600'
          >
            <Edit size={16} /> Edit
          </Link>
          <DeleteConfirmationModal movieName={movie.name} movieId={movie.id} />
        </div>
      </section>
    </div>
  );
};

export default MovieElement;
