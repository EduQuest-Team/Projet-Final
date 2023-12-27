import dayjs from 'dayjs';
import { IPharmacie } from 'app/shared/model/pharmacie.model';
import { IGarde } from 'app/shared/model/garde.model';
import { IHistorique } from 'app/shared/model/historique.model';

export interface IPharmacieGarde {
  id?: number;
  dateDebut?: dayjs.Dayjs | null;
  dateFin?: dayjs.Dayjs | null;
  pharmacies?: IPharmacie[] | null;
  gardes?: IGarde[] | null;
  historique?: IHistorique | null;
}

export const defaultValue: Readonly<IPharmacieGarde> = {};
