import { Movie } from "./MovieType";

export type Director = {
    id?: number;
    name: string;
    movies?: Movie[];
}