import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent {
  orderForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.orderForm = this.fb.group({
      city: [null],
      state: [null],
      street: [null],
      streetNumber: [null],
      zip: [null],
      phone: [null],
      orderDescription: [null],
    });
  }

  ngOnInit(): void {
    this.customerService.getProfileById().subscribe(profile => {
      if (profile) {
        this.orderForm.patchValue({
          city: profile.city,
          state: profile.state,
          street: profile.street,
          streetNumber: profile.streetNumber,
          zip: profile.zip,
          phone: profile.phone
        });
      }
    });
  }

  placeOrder(): void {
    this.customerService.placeOrder(this.orderForm.value).subscribe(
      res => {
        if (res.id != null) {
          this.snackBar.open("Order Placed Successfully", 'Close', { duration: 5000 });
          this.router.navigateByUrl("/customer/orders");
          this.closeForm(); // Close the dialog if necessary
        } else {
          this.snackBar.open("Something went wrong", 'Close', { duration: 5000 });
        }
      },
      error => {
        console.error("Error placing order:", error);
        this.snackBar.open("Something went wrong", 'Close', { duration: 5000 });
      }
    );
  }

  closeForm(): void {
    // Close the dialog or handle any necessary cleanup
    this.dialog.closeAll(); // Close all open dialogs
  }
}
