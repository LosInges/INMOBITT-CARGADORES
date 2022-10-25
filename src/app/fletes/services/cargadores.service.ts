import { Injectable } from '@angular/core';
import { Cargador } from '../interfaces/cargador';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CargadoresService {
  constructor(private httpClient: HttpClient) {}

  getCargadores(empresa: string): Observable<Cargador[]> {
    return this.httpClient.get<Cargador[]>(
      `${environment.api}/cargadores/${empresa}`
    );
  }

  getCargadoresFlete(flete: string): Observable<Cargador[]> {
    return this.httpClient.get<Cargador[]>(
      `${environment.api}/cargadores/${flete}`
    );
  }

  getCargador(empresa: string, rfc: string): Observable<Cargador> {
    return this.httpClient.get<Cargador>(
      `${environment.api}/cargador/${empresa}/${rfc}`
    );
  }

  postCargador(cargador: Cargador): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}/cargador`, cargador, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteCargador(cargador: Cargador): Observable<any> {
    return this.httpClient.delete<any>(`${environment.api}/cargador`, {
      body: cargador,
    });
  }
}
