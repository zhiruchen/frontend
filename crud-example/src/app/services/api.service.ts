import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';

@Injectable()
export class ApiService {

  baseURL = 'http://127.0.0.1:9090';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  login(loginPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.baseURL + '/login', loginPayload, this.httpOptions).pipe(
      catchError(val => of(val))
    );
  }

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseURL + '/users');
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseURL + '/users/' + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseURL + '/users', user, this.httpOptions);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseURL + '/users', user, this.httpOptions);
  }

  deleteUser(user: User): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseURL + '/users/' + user.id.toString());
  }

}
