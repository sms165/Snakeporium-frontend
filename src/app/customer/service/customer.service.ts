import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,

  ) { }

  getAllProducts(): Observable<any>{
    return this.http.get(BASIC_URL + 'api/customer/products', {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProductsByName(name:any): Observable<any>{
    return this.http.get(BASIC_URL + `api/customer/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  addToCart(productId:any): Observable<any>{
    const cartDto ={
      productId : productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + `api/customer/cart`, cartDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getCartByUserId(): Observable<any>{
    const userId ={
      userId: UserStorageService.getUserId()
    }
    console.log(userId)
    return this.http.get(BASIC_URL + `api/customer/cart/${userId.userId}`,  {
      headers: this.createAuthorizationHeader(),
    })
  }

  applyCoupon(code:any): Observable<any>{
    const userId = UserStorageService.getUserId()
    console.log(userId)
    return this.http.get(BASIC_URL + `api/customer/coupon/${userId}/${code}`,  {
      headers: this.createAuthorizationHeader(),
    })
  }

  increaseProductQuantity(productId:any): Observable<any>{
    const cartDto ={
      productId : productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + `api/customer/addition`, cartDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  decreaseProductQuantity(productId:any): Observable<any>{
    const cartDto ={
      productId : productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + `api/customer/deduction`, cartDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  placeOrder(orderDto:any): Observable<any>{
    orderDto.userId = UserStorageService.getUserId()
    return this.http.post(BASIC_URL + `api/customer/placeOrder`, orderDto,  {
      headers: this.createAuthorizationHeader(),
    })
  }

  getOrdersByUserId(): Observable<any>{
    const userId = UserStorageService.getUserId()
    return this.http.get(BASIC_URL + `api/customer/orders/${userId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getOrderedProducts(orderId:number): Observable<any>{
    return this.http.get(BASIC_URL + `api/customer/ordered-products/${orderId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  giveReview(reviewDto:any): Observable<any>{
    return this.http.post(BASIC_URL + `api/customer/review`, reviewDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getProductDetailById(productId: number): Observable<any>{
    return this.http.get(BASIC_URL + `api/customer/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  addProductToWishlist(wishlistDto:any): Observable<any>{
    return this.http.post(BASIC_URL + `api/customer/wishlist`, wishlistDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getWishlistByUserId(): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/wishlist/${userId}`,  {
      headers: this.createAuthorizationHeader(),
    })
  }

  getProfileById(): Observable<any> {
    const userId = UserStorageService.getUserId(); // Assume this retrieves the userId correctly from local storage
    const token = UserStorageService.getToken(); // Retrieve the JWT token from local storage
    console.log("User ID from storage: ", userId); // Log the user ID for debugging
    console.log("JWT Token: ", token);

    return this.http.get(BASIC_URL + `api/customer/profile?userId=${userId}`,  {
      headers: this.createAuthorizationHeader(),
    });

  }

  updateProfile(userId: number, updatedProfile: any): Observable<any> {
    console.log('Updating profile. userId:', userId, 'updatedProfile:', updatedProfile);
    return this.http.put(BASIC_URL + `api/customer/profile?userId=${userId}`, updatedProfile, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
