import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { PostCouponComponent } from './components/post-coupon/post-coupon.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { MatTableModule } from '@angular/material/table';
import { OrdersComponent } from './components/orders/orders.component';
import { PostProductFaqComponent } from './components/post-product-faq/post-product-faq.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    PostCategoryComponent,
    PostProductComponent,
    PostCouponComponent,
    CouponComponent,
    OrdersComponent,
    PostProductFaqComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    DemoAngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class AdminModule { }
