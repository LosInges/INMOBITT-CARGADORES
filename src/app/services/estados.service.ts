import { Injectable } from '@angular/core';
import { Estado } from '../interfaces/estado';

@Injectable({
  providedIn: 'root',
})
export class EstadosService {
  constructor() {}

  getEstados(): Estado[] {
    return [
      { nombre: 'Aguascalientes' },
      { nombre: 'Baja California' },
      { nombre: 'Baja California Sur' },
      { nombre: 'Campeche' },
      { nombre: 'Chiapas' },
      { nombre: 'Chihuahua' },
      { nombre: 'Coahuila' },
      { nombre: 'Colima' },
      { nombre: 'Ciudad de México' },
      { nombre: 'Durango' },
      { nombre: 'Estado de México' },
      { nombre: 'Guanajuato' },
      { nombre: 'Guerrero' },
      { nombre: 'Hidalgo' },
      { nombre: 'Jalisco' },
      { nombre: 'Michoacán' },
      { nombre: 'Morelos' },
      { nombre: 'Nayarit' },
      { nombre: 'Nuevo León' },
      { nombre: 'Oaxaca' },
      { nombre: 'Puebla' },
      { nombre: 'Querétaro' },
      { nombre: 'Quintana Roo' },
      { nombre: 'San Luis Potosí' },
      { nombre: 'Sinaloa' },
      { nombre: 'Sonora' },
      { nombre: 'Tabasco' },
      { nombre: 'Tamaulipas' },
      { nombre: 'Tlaxcala' },
      { nombre: 'Veracruz' },
      { nombre: 'Yucatán' },
      { nombre: 'Zacatecas' },
    ];
  }
}
