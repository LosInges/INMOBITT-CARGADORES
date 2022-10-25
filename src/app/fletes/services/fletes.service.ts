import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Flete } from '../interfaces/flete';

@Injectable({
  providedIn: 'root',
})
export class FletesService {
  constructor(private httpClient: HttpClient) {}

  getFletesE(empresa: string): Observable<Flete[]> {
    return this.httpClient.get<Flete[]>(
      `${environment.api}/fletesE/${empresa}`
    );
  }

  getFletesC(cliente: string): Observable<Flete[]> {
    return this.httpClient.get<Flete[]>(
      `${environment.api}/fletesC/${cliente}`
    );
  }

  getFlete(flete: string): Observable<Flete[]> {
    return this.httpClient.get<Flete[]>(`${environment.api}/flete/${flete}`);
  }

  postFlete(flete: Flete): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}/flete`, flete, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteFlete(flete: Flete): Observable<any> {
    return this.httpClient.delete<any>(`${environment.api}/flete`, {
      body: flete,
    });
  }
}
