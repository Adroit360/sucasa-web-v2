import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private cookieService: CookieService) {}

  setToken(token: string) {
    return this.cookieService.set('token', token);
  }

  getToken() {
    return this.cookieService.get('token');
  }

  deleteToken() {
    return this.cookieService.delete('token', '/');
  }
}
