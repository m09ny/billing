import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  redirectUrl: string;

  private headers: HttpHeaders;

  get isLoggedIn(): boolean {
    return !!this.currentUserLocalStorage;
  }

  get currentUserLocalStorage(): User {
    if (localStorage.getItem('currentUser') === null) {
      return null;
    }
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  set currentUserLocalStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  login(user: User): Observable<boolean> {
    return this.http.post<boolean>(environment.backendUrl + 'api/auth/login', user, { headers: this.headers });
  }

  logout(): void {
    this.currentUser = null;
    localStorage.clear();
  }
}
