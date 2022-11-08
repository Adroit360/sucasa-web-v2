import { IAccount } from './iAccounts';
import { IContacts } from './iContacts';
import { INotes } from './iNotes';
import { IUser } from './iUser';

export interface IOpportunity {
  _id: string;
  name: string;
  amount: string;
  payment_plan: string;
  account: IAccount;
  stage: [
    {
      title: string;
      description: string;
      close_date: string;
    }
  ];
  assigned_agent: IUser;
  status: string;
  createdAt: string;
  updatedAt: string;
}
