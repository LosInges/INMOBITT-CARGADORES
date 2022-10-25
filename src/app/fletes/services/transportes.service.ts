import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transporte } from '../interfaces/transporte';

@Injectable({
  providedIn: 'root',
})
export class TransportesService {
  constructor(private httpClient: HttpClient) {}

  getTransportes(empresa: string): Observable<Transporte[]> {
    return this.httpClient.get<Transporte[]>(
      `${environment.api}/transportes/${empresa}`
    );
  }

  getTransporte(empresa: string, matricula: string): Observable<Transporte> {
    return this.httpClient.get<Transporte>(
      `${environment.api}/transporte/${empresa}/${matricula}`
    );
  }

  postTransporte(transporte: Transporte): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.api}/transporte`,
      transporte,
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  deleteTransporte(transporte: Transporte): Observable<any> {
    return this.httpClient.delete(`${environment.api}/transporte`, {
      body: transporte,
    });
  }
}
