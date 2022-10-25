import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransporteFlete } from '../interfaces/transporte-flete';


@Injectable({
  providedIn: 'root',
})
export class TransporteFleteService {
  constructor(private httpClient: HttpClient) {}

  getTransportesFlete(flete: string): Observable<TransporteFlete> {
    return this.httpClient.get<TransporteFlete>(
      `${environment.api}/transporteFlete/${flete}`
    );
  }

  postTransportesFlete(transporteFlete: TransporteFlete): Observable<any> {
    console.log(transporteFlete)
    return this.httpClient.post<any>(
      `${environment.api}/transporteFlete`,
      transporteFlete
    );
  }
}
