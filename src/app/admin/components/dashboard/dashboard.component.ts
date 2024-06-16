import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Import your confirmation dialog component if separate

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: any[] = [];
  allowedFormats: string[] = ['jpeg', 'png', 'gif', 'bmp', 'svg+xml'];
  searchProductForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    });
  }

  getAllProducts() {
    this.products = [];

    this.adminService.getAllProducts().subscribe(res => {
      res.forEach(element => {
        console.log(element);
        console.log('Byte image:', element.byteImg);
        console.log('Image format from backend:', element.imageFormat);

        const formatMatch = element.byteImg.match(/^data:image\/(\w+);base64,(.*)$/);
        if (this.allowedFormats.includes(element.imageFormat)) {
          const imageUrl = 'data:image/' + element.imageFormat + ';base64,' + element.byteImg;
          element.processedImg = imageUrl;

          console.log('Image type:', element.imageFormat);
          this.products.push(element);
        } else {
          console.error('Unsupported image format for product:', element);
        }
      });
    });
  }

  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.getAllProductsByName(title).subscribe(res => {
      res.forEach(element => {
        console.log('Byte image:', element.byteImg);
        console.log('Image format from backend:', element.imageFormat);

        const formatMatch = element.byteImg.match(/^data:image\/(\w+);base64,(.*)$/);
        if (this.allowedFormats.includes(element.imageFormat)) {
          const imageUrl = 'data:image/' + element.imageFormat + ';base64,' + element.byteImg;
          element.processedImg = imageUrl;

          console.log('Image type:', element.imageFormat);
          this.products.push(element);
        } else {
          console.error('Unsupported image format for product:', element);
        }
      });
    });
  }

  // Method to open confirmation dialog
  openDeleteDialog(productId: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this product?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(productId: any) {
    this.adminService.deleteProduct(productId).subscribe(() => {
      this.snackBar.open('Product deleted successfully.', 'Close', { duration: 5000 });
      this.products = this.products.filter(product => product.id !== productId);
    }, error => {
      this.snackBar.open('Error deleting product.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
    });
  }
}
