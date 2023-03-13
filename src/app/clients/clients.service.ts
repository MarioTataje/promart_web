
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './clients.interface';
import { KPI } from './kpi.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('listclientes');
  }

  getKPI(): Observable<KPI> {
    return this.http.get<KPI>(`kpideclientes`);
  }

  createClient(data: Partial<Client>): Observable<any> {
    return this.http.post('creacliente', data);
  }
}
