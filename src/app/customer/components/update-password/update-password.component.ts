import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from 'express';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent {

  passwordForm!: FormGroup;
  hidePassword = true;
  userProfile: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<UpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userProfile = data.userProfile;
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({

      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const password = this.passwordForm.get('password')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      return;
    }

    if (this.passwordForm.valid) {
      const updatedProfile = {
        password: password // Assuming your API expects an object with `password` key
      };

      this.customerService.updatePassword(this.userProfile.id, updatedProfile).subscribe(
        (res) => {
          console.log('Password updated successfully:', res);
          this.snackBar.open('Password updated successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(true); // Close dialog and indicate success
        },
        (error) => {
          console.error('Error updating password:', error);
          this.snackBar.open('Error updating password. Please try again.', 'Close', { duration: 3000 });
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
