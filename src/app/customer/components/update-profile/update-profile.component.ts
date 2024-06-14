import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  updateForm!: FormGroup;
  userProfile: any;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userProfile = data.userProfile; // Retrieve userProfile data passed from ProfileComponent

    this.updateForm = this.fb.group({
      firstName: [this.userProfile.firstName, Validators.required],
      lastName: [this.userProfile.lastName, Validators.required],
      email: [this.userProfile.email],
      city: [this.userProfile.city],
      state: [this.userProfile.state],
      street: [this.userProfile.street],
      streetNumber: [this.userProfile.streetNumber],
      zip: [this.userProfile.zip],
      phone: [this.userProfile.phone],
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.updateForm.valid) {
      const updatedProfile = this.updateForm.value;
      console.log(updatedProfile);

      this.customerService.updateProfile(this.userProfile.id, updatedProfile).subscribe(
        (res) => {
          console.log('Profile updated successfully:', res);
          this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(true); // Close dialog and indicate success
        },
        (error) => {
          console.error('Error updating profile:', error);
          this.snackBar.open('Error updating profile. Please try again.', 'Close', { duration: 3000 });
        }
      );
    } else {
      // Handle form validation errors if needed
    }
  }

  closeForm(): void {
    this.dialogRef.close(); // Close dialog without indicating success
  }
}
