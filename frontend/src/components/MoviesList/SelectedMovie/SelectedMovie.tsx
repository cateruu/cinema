import React from 'react';
import Image from 'next/image';
import { Movie } from '../../../types/movies';

interface Props {
  movie: Movie;
}

const SelectedMovie = ({ movie }: Props) => {
  return (
    <div
      id='selected-movie'
      className='rounded-xl overflow-hidden relative aspect-video'
    >
      <Image
        src={movie.thumbnailUrl}
        alt={`${movie.name} poster`}
        width={500}
        height={300}
        className='aspect-video object-cover w-full'
        priority
      />
      <div className='absolute top-0 left-0 bg-gradient-to-t from-[#020617] to-[#D9D9D900] w-full h-full flex p-3 items-end gap-3'>
        <div className='flex flex-col '>
          <p className='text-2xl font-medium'>{movie.name}</p>
          <div className='flex gap-2  text-slate-400'>
            {movie.genre.map((genre) => (
              <p key={genre}>
                {genre.slice(0, 1).toUpperCase() + genre.slice(1)}
              </p>
            ))}
          </div>
        </div>
        <p className='text-xs max-h-14 line-clamp-3 hover:line-clamp-none hover:max-h-fit'>
          {movie.description}
        </p>
      </div>
    </div>
  );
};

export default SelectedMovie;
