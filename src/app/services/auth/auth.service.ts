import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(registerRequest: any): Observable<any> {
    const url = BASIC_URL + "register";
    // Set headers if needed
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(url, registerRequest)
      .pipe(
        catchError(error => {
          // Handle errors here, log, show error messages, etc.
          console.error('An error occurred:', error);
          return throwError('Registration failed. Please try again.'); // Return a custom error message or throw the error
        })
      );
  }
}
