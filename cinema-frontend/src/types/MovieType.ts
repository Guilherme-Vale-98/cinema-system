import { Actor } from "./ActorType";
import { Director } from "./DirectorType";
import { Session } from "./SessionType";

export type Movie = {
    id: number;
    title: string;
    genre: string;
    description: string;
    sessions: Session[];
    director: Director;
    actors: Actor[];
    runtime: number;
    posterPath: string;
    trailerPath: string;
}