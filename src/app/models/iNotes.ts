import { IUser } from './iUser';

export interface INotes {
  _id: string;
  title: string;
  note: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
