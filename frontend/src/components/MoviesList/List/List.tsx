'use client';

import React, { useEffect, useState } from 'react';
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
  const [maxListHeight, setMaxListHeight] = useState(500);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  // adjust movies list height
  useEffect(() => {
    const selectedMovieElement = document.getElementById('selected-movie');
    const searchFormElement = document.getElementById('search-form');

    if (selectedMovieElement && searchFormElement) {
      const selectedMovieParentNode = selectedMovieElement.parentNode;

      const screenSize = document.createElement('div');
      screenSize.style.width = '0';
      screenSize.style.height = '100vh';
      screenSize.style.position = 'fixed';
      screenSize.style.visibility = 'hidden';

      if (selectedMovieParentNode) {
        selectedMovieParentNode.insertBefore(screenSize, selectedMovieElement);
      }

      const selectedMovieHeight = selectedMovieElement.clientHeight;
      const searchFormHeighth = searchFormElement.clientHeight;
      const padding = 32;

      setMaxListHeight(
        screenSize.clientHeight -
          searchFormHeighth -
          selectedMovieHeight -
          padding
      );
    }
  }, []);

  return (
    <section className='min-w-72'>
      <SelectedMovie movie={selectedMovie} />
      <div
        style={{
          maxHeight: maxListHeight + 'px',
        }}
        className='overflow-y-scroll mt-3 grid grid-cols-3 gap-3 rounded-s-xl scroll-'
      >
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
