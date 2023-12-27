import { IPharmacie } from 'app/shared/model/pharmacie.model';

export interface IPosition {
  id?: number;
  latitude?: number | null;
  longitude?: number | null;
  pharmacie?: IPharmacie | null;
}

export const defaultValue: Readonly<IPosition> = {};
