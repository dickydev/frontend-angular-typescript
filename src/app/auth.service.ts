// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/login';
  private isAuthenticated = false;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      map(response => {
        if (response.token) {
          this.isAuthenticated = true;
          localStorage.setItem('token', response.token);
          console.log('token', response.token)
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Hapus token dari sessionStorage
  // clearToken(): void {
  //   sessionStorage.removeItem();
  // }
}
