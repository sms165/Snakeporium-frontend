import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackOrderComponent } from './track-order.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AuthService } from '../services/auth/auth.service'; // Import your AuthService
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TrackOrderComponent', () => {
  let component: TrackOrderComponent;
  let fixture: ComponentFixture<TrackOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackOrderComponent],
      imports: [HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ], // Provide HttpClientModule
      providers: [AuthService] // Provide AuthService (if needed)
    }).compileComponents();

    fixture = TestBed.createComponent(TrackOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
