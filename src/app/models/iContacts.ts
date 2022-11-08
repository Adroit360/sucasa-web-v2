import { IAccount } from './iAccounts';
import { INotes } from './iNotes';
import { IOpportunity } from './iOpportunity';
import { IUser } from './iUser';

export interface IContacts {
  _id: string;
  sid: string;
  title: string;
  firstName: string;
  lastName: string;
  otherName: string;
  phone: string;
  cell: string;
  account: IAccount;
  addedBy: IUser;
  assigned_agent: IUser;
  assigned_call: IUser;
  oppo: [IOpportunity];
  country: string;
  residence: string;
  email: string;
  password: string;
  notes: [INotes];
  referral: string;
  createdAt: string;
  updatedAt: string;
}
