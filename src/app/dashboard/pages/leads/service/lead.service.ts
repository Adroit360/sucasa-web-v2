import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, map } from 'rxjs';
import { ILeads } from 'src/app/models/iLeads';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  constructor(private http: HttpClient) {}

  addLoad(body: any): Observable<ILeads> {
    return this.http
      .post<ILeads>(`${environment.baseURL}/leads`, body)
      .pipe(shareReplay());
  }

  getLeads(): Observable<ILeads[]> {
    return this.http.get<ILeads[]>(`${environment.baseURL}/leads`).pipe(
      map((data: any) => data['leads']),
      shareReplay()
    );
  }

  singleLead(id: string): Observable<ILeads> {
    return this.http.get<ILeads>(`${environment.baseURL}/lead/${id}`).pipe(
      map((data: any) => data['leads']),
      shareReplay()
    );
  }
}
