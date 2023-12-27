import { IZone } from 'app/shared/model/zone.model';
import { IGarde } from 'app/shared/model/garde.model';
import { IPharmacieGarde } from 'app/shared/model/pharmacie-garde.model';
import { IPharmacien } from 'app/shared/model/pharmacien.model';
import { IPosition } from 'app/shared/model/position.model';

export interface IPharmacie {
  id?: number;
  nom?: string | null;
  adresse?: string | null;
  image?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  status?: boolean | null;
  zone?: IZone | null;
  gardes?: IGarde[] | null;
  pharmaciegardes?: IPharmacieGarde[] | null;
  pharmacien?: IPharmacien | null;
  position?: IPosition | null;
}

export const defaultValue: Readonly<IPharmacie> = {
  status: false,
};
