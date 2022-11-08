import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { IOpportunity } from 'src/app/models/iOpportunity';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OppoService {
  constructor(private http: HttpClient) {}

  singleOppo(id: string): Observable<IOpportunity> {
    return this.http
      .get<IOpportunity>(`${environment.baseURL}/opportunity/${id}`)
      .pipe(
        map((data: any) => data['oppo']),
        shareReplay()
      );
  }

  updateOppo(id: string, body: any): Observable<IOpportunity> {
    return this.http
      .put<IOpportunity>(`${environment.baseURL}/opportunity/${id}`, body)
      .pipe(shareReplay());
  }

  allOppo(): Observable<IOpportunity[]> {
    return this.http
      .get<IOpportunity[]>(`${environment.baseURL}/opportunities`)
      .pipe(
        map((data: any) => data['oppo']),
        shareReplay()
      );
  }
}
