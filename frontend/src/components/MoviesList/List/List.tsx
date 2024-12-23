'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Movie } from '../../../types/movies';
import SelectedMovie from '../SelectedMovie/SelectedMovie';
import MovieElement from '../MovieElement/MovieElement';

interface Props {
  movies: Movie[];
  selectedMovie: Movie;
}

const List = ({ movies, selectedMovie }: Props) => {
  const [mainMovie, setMainMovie] = useState<Movie>(selectedMovie);
  const [maxListHeight, setMaxListHeight] = useState(500);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleSelectMovie = (movie: Movie) => {
    setMainMovie(movie);
  };

  // adjust movies list height
  useEffect(() => {
    const selectedMovieElement = document.getElementById('selected-movie');
    const searchFormElement = document.getElementById('search-form');
    const listElement = listRef.current;

    const resizeObserver = new ResizeObserver(() => {
      if (selectedMovieElement && searchFormElement) {
        const selectedMovieParentNode = selectedMovieElement.parentNode;

        const screenSize = document.createElement('div');
        screenSize.style.width = '0';
        screenSize.style.height = '100vh';
        screenSize.style.position = 'fixed';
        screenSize.style.visibility = 'hidden';

        if (selectedMovieParentNode) {
          selectedMovieParentNode.insertBefore(
            screenSize,
            selectedMovieElement
          );
        }

        const selectedMovieHeight = selectedMovieElement.clientHeight;
        const searchFormHeighth = searchFormElement.clientHeight;
        const padding = 32;

        const maxListHeight =
          screenSize.clientHeight -
          searchFormHeighth -
          selectedMovieHeight -
          padding;
        setMaxListHeight(maxListHeight);
      }
    });

    if (listElement) {
      resizeObserver.observe(listElement);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section className='min-w-72'>
      <SelectedMovie movie={mainMovie} />
      <div
        ref={listRef}
        style={{
          maxHeight: maxListHeight + 'px',
        }}
        className='overflow-y-auto mt-3 grid grid-cols-3 gap-3 rounded-s-xl scroll-'
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
