import { Movie } from "./MovieType";
import { Ticket } from "./TicketType";


export type Session = {
    id: number;
    movie: Movie;
    startTime: Date;
    tickets?: Ticket[];
}

export interface ApiError {
    message: string;
    status: number;
  }