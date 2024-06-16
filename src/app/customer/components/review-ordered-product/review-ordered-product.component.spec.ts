import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewOrderedProductComponent } from './review-ordered-product.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatOptionModule } from '@angular/material/core'; // Import MatOptionModule
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { AdminService } from '../../../admin/service/admin.service';

describe('ReviewOrderedProductComponent', () => {
  let component: ReviewOrderedProductComponent;
  let fixture: ComponentFixture<ReviewOrderedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewOrderedProductComponent],
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
        MatOptionModule, // Include MatOptionModule here
        MatSelectModule // Include MatSelectModule here
      ],
      providers: [AdminService]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewOrderedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
