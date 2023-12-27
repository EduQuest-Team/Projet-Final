import dayjs from 'dayjs';
import { IPharmacieGarde } from 'app/shared/model/pharmacie-garde.model';
import { IPharmacien } from 'app/shared/model/pharmacien.model';

export interface IHistorique {
  id?: number;
  path?: string | null;
  date?: dayjs.Dayjs | null;
  pharmaciegarde?: IPharmacieGarde | null;
  pharmacien?: IPharmacien | null;
}

export const defaultValue: Readonly<IHistorique> = {};
