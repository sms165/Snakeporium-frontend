import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: any[] = [];
  allowedFormats: string[] = ['jpeg', 'png', 'gif', 'bmp', 'svg+xml'];
  searchProductForm! : FormGroup;


  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
  private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm= this.fb.group({
      title: [null, [Validators.required]]
    })

  }

  getAllProducts() {
    this.products = [];

    this.adminService.getAllProducts().subscribe(res => {
      res.forEach(element => {
        console.log('Byte image:', element.byteImg);
        console.log('Image format from backend:', element.imageFormat);
        // Extract image format from the data URI

        const formatMatch = element.byteImg.match(/^data:image\/(\w+);base64,(.*)$/);
        if (this.allowedFormats.includes(element.imageFormat)) {
          // Image format is allowed
          const imageUrl = 'data:image/' + element.imageFormat + ';base64,' + element.byteImg;
          element.processedImg = imageUrl;

          // Log the type of image
          console.log('Image type:', element.imageFormat);

          this.products.push(element);
        } else {
          console.error('Unsupported image format for product:', element);
        }
      });
    });
  }

  submitForm(){
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.getAllProductsByName(title).subscribe(res => {
      res.forEach(element => {
        console.log('Byte image:', element.byteImg);
        console.log('Image format from backend:', element.imageFormat);
        // Extract image format from the data URI

        const formatMatch = element.byteImg.match(/^data:image\/(\w+);base64,(.*)$/);
        if (this.allowedFormats.includes(element.imageFormat)) {
          // Image format is allowed
          const imageUrl = 'data:image/' + element.imageFormat + ';base64,' + element.byteImg;
          element.processedImg = imageUrl;

          // Log the type of image
          console.log('Image type:', element.imageFormat);

          this.products.push(element);
        } else {
          console.error('Unsupported image format for product:', element);
        }
      });
    });
  }

  deleteProduct(productId: any) {
    this.adminService.deleteProduct(productId).subscribe(() => {
      this.snackBar.open('Product deleted successfully.', 'Close', { duration: 5000 });
      // Remove the deleted product from the product list
      this.products = this.products.filter(product => product.id !== productId);
    }, error => {
      this.snackBar.open('Error deleting product.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
    });
  }

}
