import { ITicket } from './ITicket';

export interface IBook {
  id?: number;
  ticket: ITicket;
  firstName: string;
  lastName: string;
}
