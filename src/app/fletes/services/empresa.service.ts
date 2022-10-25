import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  constructor(private httpClient: HttpClient) {}

  getEmpresas(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(`${environment.api}/empresas`);
  }

  getEmpresa(correo: string): Observable<Empresa> {
    return this.httpClient.get<Empresa>(
      `${environment.api}/empresa/${correo}`
    );
  }

  postEmpresa(empresa: Empresa): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}/empresa`, empresa, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteEmpresa(correo: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.api}/empresa`, {
      body: { correo },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
