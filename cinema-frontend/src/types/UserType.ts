import { Role } from "./RoleType";
import { Ticket } from "./TicketType";

export interface User {
    id: number;
    username: string;
    email: string;
    roles: string[];
    accessToken: string;
    tokenType: string;
    tickets?: Ticket[];
  }