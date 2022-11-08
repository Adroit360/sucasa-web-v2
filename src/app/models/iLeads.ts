import { INotes } from './iNotes';
import { IOpportunity } from './iOpportunity';
import { IUser } from './iUser';

export interface ILeads {
  title: string;
  sid: string;
  firstName: string;
  lastName: string;
  otherName: string;
  phone: string;
  cell: string;
  email: string;
  country: string;
  residence: string;
  stage: string;
  addedBy: IUser;
  isPartnership: boolean;
  isCompany: boolean;
  address1: string;
  address2: string;
  document: [
    {
      document_type: string;
      document_link: string;
    }
  ];
  nextKin: {
    firstName: string;
    lastName: string;
    otherName: string;
    relation: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    country: string;
  };
  assigned_agent: IUser;
  oppo: [IOpportunity];
  assigned_to: IUser;
  referral: string;
  notes: [INotes];
  createdAt: string;
  updatedAt: string;
}
