import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
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
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    router = TestBed.inject(Router);

    // Replace router.navigateByUrl with a mock implementation
    spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true)); // Replace 'true' with any appropriate return value
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when passwords do not match', () => {
    const formValues = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      confirmPassword: 'password123'
    };

    // Set form values
    component.registerForm.setValue(formValues);

    // Simulate form submission
    component.onSubmit();

    // Assert that snackbar shows an error message
    expect(snackBar.open).toHaveBeenCalledWith('Passwords do not match', 'Close', jasmine.any(Object));
  });

  it('should call AuthService.register and show success message on successful registration', fakeAsync(() => {
    const formValues = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      confirmPassword: 'password'
    };

    // Set form values
    component.registerForm.setValue(formValues);

    // Mock successful response from AuthService
    authService.register.and.returnValue(of({}));

    // Simulate form submission
    component.onSubmit();
    tick(); // Wait for async operations to complete

    // Assert that AuthService.register was called
    expect(authService.register).toHaveBeenCalledWith(formValues);

    // Assert that snackbar shows a success message
    expect(snackBar.open).toHaveBeenCalledWith('Successful registration', 'Close', jasmine.any(Object));

    // Assert that router was not navigated to '/login'
    expect(router.navigateByUrl).not.toHaveBeenCalledWith('/logi');
  }));

  it('should show error snackbar on registration failure', fakeAsync(() => {
    const formValues = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      confirmPassword: 'password'
    };

    // Set form values
    component.registerForm.setValue(formValues);

    // Mock error response from AuthService
    authService.register.and.returnValue(throwError('Registration failed'));

    // Simulate form submission
    component.onSubmit();
    tick(); // Wait for async operations to complete

    // Assert that snackbar shows an error message
    expect(snackBar.open).toHaveBeenCalledWith('Registration failed. Please try again.', 'Close', jasmine.any(Object));
  }));

});
