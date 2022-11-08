import { IContacts } from './iContacts';
import { INotes } from './iNotes';
import { IOpportunity } from './iOpportunity';
import { IUser } from './iUser';

export interface IAccount {
  _id: string;
  sid: string;
  name: string;
  phone: string;
  address: string;
  contact: [IContacts];
  oppo: [IOpportunity];
  assigned_agent: IUser;
  notes: [INotes];
  status: string;
  createdAt: string;
  updatedAt: string;
}
