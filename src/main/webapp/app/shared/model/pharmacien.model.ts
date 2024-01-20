import { IPharmacie } from 'app/shared/model/pharmacie.model';

export interface IPharmacien {
  id?: number;
  nom?: string | null;
  prenom?: string | null;
  email?: string | null;
  password?: string | null;
  pharmacie?: IPharmacie | null;
}

export const defaultValue: Readonly<IPharmacien> = {};
