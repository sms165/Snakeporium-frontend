import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProfileComponent } from './update-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from '../../../admin/service/admin.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import MAT_DIALOG_DATA

describe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;

  // Mock MatDialogRef
  const matDialogRefMock = {
    close: jasmine.createSpy('close') // Add any methods your component uses
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProfileComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatTableModule // Include MatTableModule here
      ],
      providers: [
        AdminService,
        { provide: MatDialogRef, useValue: matDialogRefMock }, // Provide mock MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: { userProfile: { firstName: 'John', lastName: 'Doe', email: 'jas@test.com'   }} } // Provide mock for MAT_DIALOG_DATA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
