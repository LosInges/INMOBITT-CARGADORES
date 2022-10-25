import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paquete } from '../interfaces/paquete';
import { TransporteFlete } from '../interfaces/transporte-flete';

@Injectable({
  providedIn: 'root',
})
export class PaquetesService {
  constructor(private httpClient: HttpClient) {}

  getPaquetes(flete: string): Observable<TransporteFlete> {
    return this.httpClient.get<TransporteFlete>(
      `${environment.api}/paquetes/${flete}`
    );
  }

  deletePaquete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.api}/paquete`, {
      body: { id },
    });
  }

 
}
