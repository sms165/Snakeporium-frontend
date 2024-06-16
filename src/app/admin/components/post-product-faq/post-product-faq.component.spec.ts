import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProductFaqComponent } from './post-product-faq.component';
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

describe('PostProductFaqComponent', () => {
  let component: PostProductFaqComponent;
  let fixture: ComponentFixture<PostProductFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostProductFaqComponent],
      imports: [ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,], // Add HttpClientModule here
      providers: [AdminService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostProductFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
