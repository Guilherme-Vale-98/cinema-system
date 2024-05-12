import { Role } from "./RoleType";
import { Ticket } from "./TicketType";

export type User = {
    id?: number;
    username: string;
    email: string;
    password: string;
    roles?: Role[];
    tickets?: Ticket[];
}