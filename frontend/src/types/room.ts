export interface Room {
  room: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  availableSeats: string[];
  capacity: number;
  rows: number;
}
