import { iAddress } from './Address.model';
import { iEmail } from './Email.model';
import { iPhone } from './Phone.model';
import { iCategory } from './Category.model';
import { iPhoto } from './Photo.model';

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
