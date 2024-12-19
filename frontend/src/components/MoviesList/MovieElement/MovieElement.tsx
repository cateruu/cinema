'use client';

import React from 'react';
import { Movie } from '../../../types/movies';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  movie: Movie;
  isSelected: boolean;
  setSelectedMovie: (movie: Movie) => void;
}

const MovieElement = ({ movie, isSelected, setSelectedMovie }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        setSelectedMovie(movie);
        router.push(`/?selectedMovie=${movie.id}`);
      }}
      className={`flex flex-col px-1 bg-slate-950 rounded-xl p-1 cursor-pointer pb-2 shadow-orange-400 hover:shadow-sm hover:shadow-orange-400 transition-shadow ${
        isSelected && 'shadow-sm'
      }`}
    >
      <Image
        src={movie.thumbnailUrl}
        alt={`${movie.name} poster`}
        width={500}
        height={500}
        className='w-full aspect-square object-cover rounded-lg max-w-[200px]'
      />
      <p className='text-sm mt-1'>{movie.name}</p>
      <div className='flex gap-2 text-[10px] text-slate-400'>
        {movie.genre.map((genre) => (
          <p key={genre}>{genre.slice(0, 1).toUpperCase() + genre.slice(1)}</p>
        ))}
      </div>
    </div>
  );
};

export default MovieElement;
