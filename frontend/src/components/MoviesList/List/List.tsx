'use client';

import React, { useState } from 'react';
import { Movie } from '../../../types/movies';
import SelectedMovie from '../SelectedMovie/SelectedMovie';
import MovieElement from '../MovieElement/MovieElement';

interface Props {
  movies: Movie[];
  initialSelectedMovieId: Movie;
}

const List = ({ movies, initialSelectedMovieId }: Props) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(
    initialSelectedMovieId
  );

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <section>
      <SelectedMovie movie={selectedMovie} />
      <div className='mt-3 grid grid-cols-3 gap-3'>
        {movies.map((movie) => (
          <MovieElement
            key={movie.id}
            movie={movie}
            isSelected={selectedMovie.id === movie.id}
            setSelectedMovie={handleSelectMovie}
          />
        ))}
      </div>
    </section>
  );
};

export default List;
