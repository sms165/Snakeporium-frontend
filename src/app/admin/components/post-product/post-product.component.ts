import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent {
  productForm!: FormGroup;
  listOfCategories: any =[];
  listOfSexes: any =[];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ){}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedFormats: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/svg+xml'];

    // Check if the selected file is of an allowed format
    if (file && allowedFormats.includes(file.type)) {
      // Process the file
      this.selectedFile = file;
      this.previewImage();
    } else {
      this.snackBar.open('The file cannot be added', 'Close', { duration: 5000 });// Display an error message to the user
      console.error('Unsupported file format');
      // Optionally, reset the file input to clear the selection
      event.target.value = null;
    }
  }


  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string; // Ensure that reader.result is of type string
    };
    reader.readAsDataURL(this.selectedFile);
  }




  ngOnInit():void{
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null],
      sexId: [null, [Validators.required]],
      // species: [null, [Validators.required]],
      latin: [null, [Validators.required]],
    })

    this.getAllCategories();
    this.getAllSexes();
  }

  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res=>{
      this.listOfCategories = res;
      console.log('Categories:', this.listOfCategories);
  })
  }

  getAllSexes(){
    this.adminService.getAllSexes().subscribe(res=>{
      this.listOfSexes = res;
      console.log('Sexes:', this.listOfSexes);
  })
  }

  addProduct(): void {
    if (this.productForm.valid && this.selectedFile) {
      const formData: FormData = new FormData();

      // Append image file with its extension
      const fileExtension = this.selectedFile.name.split('.').pop();
      formData.append('img', this.selectedFile, `product_image.${fileExtension}`);

      formData.append('imageFormat', fileExtension);

      formData.append('sexId', this.productForm.get('sexId').value);
      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);
      // formData.append('species', this.productForm.get('species').value);
      formData.append('latin', this.productForm.get('latin').value);

 // Log formData keys and values for verification
 console.log('Form Data Entries:');
 formData.forEach((value, key) => {
   console.log(`${key}: ${value}`);
 });


      this.adminService.addProduct(formData).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Product added successfully', 'Close', { duration: 5000 });
          console.log('Image format:', fileExtension);
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
    }
  }

  }
