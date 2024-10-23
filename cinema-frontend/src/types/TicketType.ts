import { Session } from "./SessionType";

export type Ticket = {
    id?: number;
    session: Session;
    userId?: number;
    seat: Seat;
}

type Seat = {
    column: string;
    row: string;
    price: number;
    type: string;
}