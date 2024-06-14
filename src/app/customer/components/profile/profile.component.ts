import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: any;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.customerService.getProfileById().subscribe(
      (res) => {
        console.log(res);
        this.userProfile = res;
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  updateProfile(): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      width: '400px',
      data: { userProfile: this.userProfile } // Pass userProfile data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If dialog returns true (meaning profile was updated), reload the profile
        this.getUserProfile();
      }
    });
  }
}
