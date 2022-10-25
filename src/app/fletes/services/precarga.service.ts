import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Precarga } from '../interfaces/precarga';

@Injectable({
  providedIn: 'root',
})
export class PrecargaService {
  constructor(private httpClient: HttpClient) {}

  getPrecargas(empresa: string): Observable<Precarga[]> {
    return this.httpClient.get<Precarga[]>(
      `${environment.api}/precargas/${empresa}`
    );
  }

  getPrecarga(empresa: string, id: string): Observable<Precarga> {
    return this.httpClient.get<Precarga>(
      `${environment.api}/precarga/${empresa}/${id}`
    );
  }

  deletePrecarga(empresa: string, id: string): Observable<any> {
    return this.httpClient.delete(`${environment.api}/precarga`, {
      body: { empresa, id },
    });
  }

  postPrecarga(precarga: Precarga): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}/precarga`, precarga, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
