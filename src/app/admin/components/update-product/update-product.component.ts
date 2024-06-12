

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {

  productId= this.activatedRoute.snapshot.params['productId'];

  productForm!: FormGroup;
  listOfCategories: any =[];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  existingImage: string | null = null;
  imgChanged = false;

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
  ){}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedFormats: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/svg+xml'];

    // Check if the selected file is of an allowed format
    if (file && allowedFormats.includes(file.type)) {
      // Process the file
      this.selectedFile = file;
      this.previewImage();
      this.imgChanged = true;

      this.existingImage= null;
    } else {
      // Display an error message to the user
      console.error('Unsupported file format');
      // Optionally, reset the file input to clear the selection
      event.target.value = null;
    }
  }


  ngOnInit():void{
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })

    this.getAllCategories();
    this.getProductById();
  }


  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string; // Ensure that reader.result is of type string
    };
    reader.readAsDataURL(this.selectedFile);
  }


  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res=>{
      this.listOfCategories = res;
      console.log('Categories:', this.listOfCategories);
  })
  }

  getProductById() {
    this.adminService.getProductById(this.productId).subscribe(res => {
      this.productForm.patchValue(res);

      // Check for the presence of an image format field
      const imageFormat = res.imageFormat || 'jpeg'; // Default to 'jpeg' if not provided
      this.existingImage = `data:image/${imageFormat};base64,${res.byteImg}`;
    });
  }

  updateProduct(): void {
  if (this.productForm.valid) {
    const formData: FormData = new FormData();

    if (this.imgChanged && this.selectedFile) {
      const fileExtension = this.selectedFile.name.split('.').pop();
      formData.append('img', this.selectedFile, `product_image.${fileExtension}`);
      formData.append('imageFormat', fileExtension);
    }

    // Append only modified form data
    // if (this.productForm.get('categoryId').dirty) {
    //   formData.append('categoryId', this.productForm.get('categoryId').value);
    // }
    if (this.productForm.get('name').dirty) {
      formData.append('name', this.productForm.get('name').value);
    }
    if (this.productForm.get('description').dirty) {
      formData.append('description', this.productForm.get('description').value);
    }
    if (this.productForm.get('price').dirty) {
      formData.append('price', this.productForm.get('price').value);
    }

    // Make the API call to update the product
    this.adminService.updateProduct(this.productId, formData).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Product updated successfully', 'Close', { duration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        this.snackBar.open(res.message, 'ERROR', { duration: 5000 });
      }
    });
  } else {
    for (const i in this.productForm.controls) {
      this.productForm.controls[i].markAsDirty();
      this.productForm.controls[i].updateValueAndValidity();
    }
    // Handle form validation errors
  }
}



  }

