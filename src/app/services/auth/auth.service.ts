import { UserStorageService } from './../storage/user-storage.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASIC_URL = "https://snakeporium-backend-9fb6a7c60073.herokuapp.com";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,  private userStorageService : UserStorageService) { }



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




  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, password };

    return this.http.post(`${BASIC_URL}authenticate`, body, { headers, observe: 'response' }).pipe(
      map((res) => {
        const token = res.headers.get('authorization')?.substring(7);
        const user = res.body;

        if (token && user) {
          // Save using both methods (choose one approach long-term)
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          localStorage.setItem('authToken', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    );
  }


  getOrderByTrackingId(trackingId: number):Observable<any>{
    return this.http.get(BASIC_URL + `order/${trackingId}`);

  }


}
