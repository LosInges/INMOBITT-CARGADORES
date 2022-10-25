/* eslint-disable @typescript-eslint/naming-convention */
import { Direccion } from './direccion';

export interface Precarga {
  id: string;
  cajas_chicas: number;
  cajas_grandes: number;
  cajas_medianas: number;
  muebles: number;
  empresa: string;
  cliente: string;
  destino: Direccion;
  fecha: string;
  hora: string;
  origen: Direccion;
  telefono: string;
}
