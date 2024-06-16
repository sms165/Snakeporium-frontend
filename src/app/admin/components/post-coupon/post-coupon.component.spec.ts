import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCouponComponent } from './post-coupon.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from '../../service/admin.service';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Import MatDatepickerModule
import { MatNativeDateModule } from '@angular/material/core'; // Import MatNativeDateModule

describe('PostCouponComponent', () => {
  let component: PostCouponComponent;
  let fixture: ComponentFixture<PostCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCouponComponent],
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
        MatDatepickerModule, // Add MatDatepickerModule here
        MatNativeDateModule // Add MatNativeDateModule here
      ],
      providers: [AdminService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


