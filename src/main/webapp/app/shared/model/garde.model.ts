import { IPharmacie } from 'app/shared/model/pharmacie.model';
import { IPharmacieGarde } from 'app/shared/model/pharmacie-garde.model';

export interface IGarde {
  id?: number;
  type?: boolean | null;
  pharmacies?: IPharmacie[] | null;
  pharmaciegardes?: IPharmacieGarde[] | null;
}

export const defaultValue: Readonly<IGarde> = {
  type: false,
};
