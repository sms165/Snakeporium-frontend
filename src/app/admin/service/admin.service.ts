import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = "https://snakeporium-backend-9fb6a7c60073.herokuapp.com/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory( categoryDto: any): Observable<any>{
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDto, {
      headers: this.createAuthorizationHeader(),
    })
}

addProduct( productDto: any): Observable<any>{
  return this.http.post(BASIC_URL + 'api/admin/product', productDto, {
    headers: this.createAuthorizationHeader(),
  })
}

getAllCategories(): Observable<any>{
  return this.http.get(BASIC_URL + 'api/admin', {
    headers: this.createAuthorizationHeader(),
  })
}

getAllSexes(): Observable<any>{
  return this.http.get(BASIC_URL + 'api/admin/sex', {
    headers: this.createAuthorizationHeader(),
  })
}

getAllProducts(): Observable<any>{
  return this.http.get(BASIC_URL + 'api/admin/products', {
    headers: this.createAuthorizationHeader(),
  })
}

getAllProductsByName(name:any): Observable<any>{
  return this.http.get(BASIC_URL + `api/admin/search/${name}`, {
    headers: this.createAuthorizationHeader(),
  })
}

deleteProduct( productId: any): Observable<any>{
  return this.http.delete(BASIC_URL + `api/admin/product/${productId}`, {
    headers: this.createAuthorizationHeader(),
  })
}

addCoupon( couponDto: any): Observable<any>{
  return this.http.post(BASIC_URL + 'api/admin/coupons', couponDto, {
    headers: this.createAuthorizationHeader(),
  })
}

getCoupon(): Observable<any>{
  return this.http.get(BASIC_URL + 'api/admin/coupons', {
    headers: this.createAuthorizationHeader(),
  })
}

getPlacedOrders(): Observable<any>{
  return this.http.get(BASIC_URL + 'api/admin/orders', {
    headers: this.createAuthorizationHeader(),
  })
}

changeOrderStatus(orderId: number, status:string): Observable<any>{
  return this.http.get(BASIC_URL + `api/admin/orders/${orderId}/${status}`, {
    headers: this.createAuthorizationHeader(),
  })
}

postFaq(productId: number, faqDto:any): Observable<any>{
  return this.http.post(BASIC_URL + `api/admin/faq/${productId}`,faqDto, {
    headers: this.createAuthorizationHeader(),
  })
}

getProductById(productId): Observable<any>{
  return this.http.get(BASIC_URL + `api/admin/product/${productId}`, {
    headers: this.createAuthorizationHeader(),
  })
}

updateProduct(productId: any, productDto: any): Observable<any>{
  return this.http.put(BASIC_URL + `api/admin/product/${productId}`, productDto, {
    headers: this.createAuthorizationHeader(),
  })
}

getAnalytics(): Observable<any>{
  return this.http.get(BASIC_URL + 'api/admin/orders/analytics', {
    headers: this.createAuthorizationHeader(),
  })
}

private createAuthorizationHeader(): HttpHeaders{
  return new HttpHeaders().set(
    'Authorization', 'Bearer ' + UserStorageService.getToken()
  )
}



}
