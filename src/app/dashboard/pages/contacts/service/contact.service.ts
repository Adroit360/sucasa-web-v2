import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { IAccount } from 'src/app/models/iAccounts';
import { IContacts } from 'src/app/models/iContacts';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  getContacts(): Observable<IContacts[]> {
    return this.http.get<IContacts[]>(`${environment.baseURL}/contacts`).pipe(
      map((data: any) => data['contact']),
      shareReplay()
    );
  }

  addContact(body: any): Observable<IContacts> {
    return this.http
      .post<IContacts>(`${environment.baseURL}/contacts`, body)
      .pipe(shareReplay());
  }

  singleContact(id: string): Observable<IContacts> {
    return this.http
      .get<IContacts>(`${environment.baseURL}/contact/${id}`)
      .pipe(
        map((data: any) => data['contact']),
        shareReplay()
      );
  }
}
