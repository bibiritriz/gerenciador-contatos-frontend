import { iAddress } from './Address';
import { iEmail } from './Email';
import { iPhone } from './Phone';
import { iCategory } from './Category';
import { iPhoto } from './Photo';

export interface iContact {
  id: number;
  name: string;
  lastname: string;
  nickname: string;
  birthday: string;
  note: string;
  favorite: boolean;
  phones: iPhone[];
  emails: iEmail[];
  addresses: iAddress[];
  categories: iCategory[];
  photo: iPhoto;
}
