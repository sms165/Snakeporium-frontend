import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orders: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ){
  }

  ngOnInit(){
    this.getPlacedOrders();
  }

  getPlacedOrders(){
    this.adminService.getPlacedOrders().subscribe(res =>{
      this.orders = res;
    })
  }

  openDialog(order: any): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '400px',
      data: { street: order.street, state: order.state },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  changeOrderStatus(orderId: number, status: string){
    this.adminService.changeOrderStatus(orderId,status).subscribe(res =>{
      if (res.id != null){
        this.snackBar.open("Order status has been changed", "Close", {
          duration:5000
        });
        this.getPlacedOrders();
      }else{
        this.snackBar.open("Something went wrong", "Close", {
          duration: 5000
        });
      }
    })
  }

}
