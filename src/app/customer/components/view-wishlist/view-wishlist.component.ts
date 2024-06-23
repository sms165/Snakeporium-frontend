import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrl: './view-wishlist.component.scss'
})
export class ViewWishlistComponent {

  products: any[] = [];


  constructor(
    private customerService: CustomerService,

) {

  }

  ngOnInit(){
    this.getWishlistByUserId();
    }

    getWishlistByUserId(){
      this.customerService.getWishlistByUserId().subscribe(res =>{
        res.forEach(element => {
          element.processedImg = 'data:image/' + element.imageFormat + ';base64,' + element.returnedImg;
          this.products.push(element);
          console.log(element)
        });
      })
    }


}
