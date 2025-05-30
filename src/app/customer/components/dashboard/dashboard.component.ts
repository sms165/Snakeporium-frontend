import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../service/customer.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products: any[] = [];
  allowedFormats: string[] = ['jpeg', 'png', 'gif', 'bmp', 'svg+xml'];
  searchProductForm!: FormGroup;
  loading = false;



  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    });
  }

  getAllProducts() {
    this.loading = true;
    this.products = [];

    this.customerService.getAllProducts().subscribe(res => {
      this.processProducts(res);
      this.loading = false;
    });
  }

  submitForm() {
    this.loading = true;
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;

    this.customerService.getAllProductsByName(title).subscribe(res => {
      this.processProducts(res);
      this.loading = false;
    });
  }

  processProducts(products: any[]) {
    products.forEach(element => {
      console.log('Byte image:', element.byteImg);
      console.log('Image format from backend:', element.imageFormat);
      if (this.allowedFormats.includes(element.imageFormat)) {
        const imageUrl = 'data:image/' + element.imageFormat + ';base64,' + element.byteImg;
        element.processedImg = imageUrl;
        console.log('Image type:', element.imageFormat);
        this.products.push(element);
      } else {
        console.error('Unsupported image format for product:', element);
      }
    });
  }

  addToCart(id: any) {
    this.customerService.addToCart(id).subscribe(res => {
      this.snackBar.open("Product has been added to the cart", "Close", { duration: 5000 });
    });
  }
}
