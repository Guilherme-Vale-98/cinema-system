import { Movie } from "./MovieType";


export type Actor = {
    id?: number;
    name: string;
    movies?: Movie[];
}