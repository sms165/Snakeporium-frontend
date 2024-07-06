import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { CacheService } from './cache.service';

const BASIC_URL = "https://snakeporium-backend-9fb6a7c60073.herokuapp.com/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,
    private cacheService: CacheService

  ) { }

  getAllProducts(): Observable<any> {
    const cacheKey = 'allProducts';
    if (this.cacheService.has(cacheKey)) {
      return of(this.cacheService.get(cacheKey));
    }
    return this.http.get(BASIC_URL + 'api/customer/products', {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap(data => this.cacheService.set(cacheKey, data))
    );
  }

  getAllProductsByName(name: any): Observable<any> {
    const cacheKey = `productsByName-${name}`;
    if (this.cacheService.has(cacheKey)) {
      return of(this.cacheService.get(cacheKey));
    }
    return this.http.get(BASIC_URL + `api/customer/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap(data => this.cacheService.set(cacheKey, data))
    );
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

  removeItemFromCart(userId: number, productId: number): Observable<any> {

    return this.http.delete<any>(BASIC_URL + `api/customer/cart/${userId}/${productId}`, {
    headers: this.createAuthorizationHeader()});

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
    // Assume this retrieves the userId correctly from local storage
    const userId = UserStorageService.getUserId();
    // Retrieve the JWT token from local storage
    const token = UserStorageService.getToken();
    // Log the user ID for debugging
    console.log("User ID from storage: ", userId);
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

  updatePassword(userId: number, updatedProfile: any): Observable<any> {
    console.log('Updating profile. userId:', userId, 'updatedProfile:', updatedProfile);
    return this.http.put(BASIC_URL + `api/customer/profile/password?userId=${userId}`, updatedProfile, {
      headers: this.createAuthorizationHeader()
    });
  }

  getRandomQuestionsWithProductDetails(productId: number): Observable<any> {
    return this.http.get(BASIC_URL + `/random-questions/${productId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getPredefinedQuestionsAndResponses(productId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/details/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }


  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
