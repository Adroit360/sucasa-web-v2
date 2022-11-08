import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { IAccount } from 'src/app/models/iAccounts';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  allAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${environment.baseURL}/accounts`).pipe(
      map((data: any) => data['account']),
      shareReplay()
    );
  }

  singleAccount(id: any): Observable<IAccount> {
    return this.http.get<IAccount>(`${environment.baseURL}/account/${id}`).pipe(
      map((data: any) => data['account']),
      shareReplay()
    );
  }
}
