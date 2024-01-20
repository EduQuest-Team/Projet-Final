export interface IVille {
  id?: number;
  nom?: string | null;
  image?: Blob | null;
}

export const defaultValue: Readonly<IVille> = {};
