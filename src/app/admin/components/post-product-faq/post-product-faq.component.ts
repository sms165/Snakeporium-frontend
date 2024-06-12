import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrl: './post-product-faq.component.scss'
})
export class PostProductFaqComponent {

  FAQForm!: FormGroup;

  productId: number = this.activatedRoute.snapshot.params['productId']


  constructor(
    private fb : FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
  ){}



  ngOnInit():void{
    this.FAQForm = this.fb.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]],

    })
  }

  postFaq(){
    this.adminService.postFaq(this.productId, this.FAQForm.value)
      .subscribe(res =>{
        if(res.id != null){
          this.snackBar.open("FAQ posted successfully", 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        }else{
          this.snackBar.open("Something went wrong", 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      } );

  }
}
