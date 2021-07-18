import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.authBackend;
  private _user: User;

  get user(){
    return { ... this._user};
  }

  constructor(private http: HttpClient) { }

  Login(email: string, password: string){

    const url: string = `${this.baseUrl}/auth/`;
    const body = {email, password};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
          if(resp.ok){
            localStorage.setItem('token', resp.token);
            this._user = {
              name: resp.name,
              uid: resp.uid,
              email: resp.email
            }
          }
        }),
        map( valid => valid.ok ),
        catchError( err => of(err.error.msg))
      )
  }

  Signup(name: string, email: string, password: string){

    const url: string = `${this.baseUrl}/auth/new`;
    const body = {name, email, password};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
          if(resp.ok){
            localStorage.setItem('token', resp.token);
            this._user = {
              name: resp.name,
              uid: resp.uid,
              email: resp.email
            }
          }
        }),
        map( valid => valid.ok ),
        catchError( err => of(err.error.msg))
      )
  }

  ValidateToken(){
    const url: string = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers})
      .pipe(
        map( resp => {

          localStorage.setItem('token', resp.token);
          this._user = {
            name: resp.name,
            uid: resp.uid,
            email: resp.email
          }

          return resp.ok
        }),
        catchError(err => of(false))
      );
  }

  Logout(){
    localStorage.removeItem('token');
  }

}
