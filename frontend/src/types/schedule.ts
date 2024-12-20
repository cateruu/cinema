import { Movie } from './movies';
import { Room } from './room';

export interface Schedule {
  id: string;
  playingTime: string;
  movie: Movie;
  room: Room;
}
