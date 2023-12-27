import { IPharmacie } from 'app/shared/model/pharmacie.model';
import { IHistorique } from 'app/shared/model/historique.model';

export interface IPharmacien {
  id?: number;
  nom?: string | null;
  prenom?: string | null;
  email?: string | null;
  password?: string | null;
  pharmacie?: IPharmacie | null;
  historique?: IHistorique | null;
}

export const defaultValue: Readonly<IPharmacien> = {};
