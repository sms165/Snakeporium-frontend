import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {
  orderForm!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
  private snackBar: MatSnackBar,
public dialog: MatDialog,
private router: Router,

) {

  }

  ngOnInit(): void{
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null]
    })

  }

  placeOrder(){
    this.customerService.placeOrder(this.orderForm.value).subscribe(res =>{
      if(res.id != null){
        console.log(res.id);
        this.snackBar.open("Order Placed Successfully", 'Close', {
          duration: 5000
        })
        this.router.navigateByUrl("/customer/orders");
        this.closeForm();
      }else{
        this.snackBar.open("Something went wrong", 'Close', {
          duration: 5000
        });
      }
    })
  }

  closeForm(){
    this.dialog.closeAll()
  }


}

