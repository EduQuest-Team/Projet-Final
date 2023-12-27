import { IVille } from 'app/shared/model/ville.model';

export interface IZone {
  id?: number;
  nom?: string | null;
  ville?: IVille | null;
}

export const defaultValue: Readonly<IZone> = {};
