import { Direccion } from './direccion';

export interface Flete {
  activo: boolean;
  id: string;
  empresa: string;
  cliente: string;
  destino: Direccion;
  fecha: string;
  hora: string;
  origen: Direccion;
  telefono: string;
}
