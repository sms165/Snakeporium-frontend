import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.scss'
})
export class CouponComponent {

  coupons: any;

  constructor(
    private adminService: AdminService
  ){
  }

  ngOnInit(){
    this.getCoupons();
  }

  getCoupons(){
    this.adminService.getCoupon().subscribe(res =>{
      this.coupons = res;
    })
  }

}
