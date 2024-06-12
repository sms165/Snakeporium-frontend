import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-review-ordered-product',
  templateUrl: './review-ordered-product.component.html',
  styleUrl: './review-ordered-product.component.scss'
})
export class ReviewOrderedProductComponent {

  reviewForm!: FormGroup;
  productId: number = this.activatedRoute.snapshot.params["productId"];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
  private snackBar: MatSnackBar,
public dialog: MatDialog,
private router: Router,
private activatedRoute: ActivatedRoute,


) {

  }

  ngOnInit(){
    this.reviewForm = this.fb.group({
      rating:[null, [Validators.required]],
      description: [null, [Validators.required]],

    })
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload= ()=>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  submitForm() {
    const formData: FormData = new FormData();
    if (this.selectedFile) {
        formData.append('img', this.selectedFile);
    }
    formData.append('productId', this.productId.toString());
    formData.append('userId', UserStorageService.getUserId().toString());
    formData.append('rating', this.reviewForm.get("rating").value);
    formData.append('description', this.reviewForm.get("description").value);

    this.customerService.giveReview(formData).subscribe(res => {
        if (res.id != null) {
            this.snackBar.open('Review Posted Successfully!', 'Close', {
                duration: 5000
            });
            this.router.navigateByUrl('/customer/orders');
        } else {
            this.snackBar.open('Something went wrong', 'ERROR', {
                duration: 5000
            });
        }
    });
}


}
