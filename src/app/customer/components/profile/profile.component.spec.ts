import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CustomerService } from '../../service/customer.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let customerService: jasmine.SpyObj<CustomerService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const customerServiceSpy = jasmine.createSpyObj('CustomerService', ['getProfileById']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open', 'afterClosed']);

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    customerService = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user profile on initialization', () => {
    const mockUserProfile = { /* mock user profile data */ };
    customerService.getProfileById.and.returnValue(of(mockUserProfile));

    fixture.detectChanges(); // Trigger ngOnInit()

    expect(customerService.getProfileById).toHaveBeenCalled();
    expect(component.userProfile).toEqual(mockUserProfile);
  });

  it('should open UpdateProfileComponent dialog on updateProfile()', () => {
    const mockUserProfile = { /* mock user profile data */ };
    component.userProfile = mockUserProfile;
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    dialog.open.and.returnValue(dialogRefSpyObj);

    component.updateProfile();

    expect(dialog.open).toHaveBeenCalledWith(UpdateProfileComponent, { width: '400px', data: { userProfile: mockUserProfile } });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(component.getUserProfile).toHaveBeenCalled(); // Mock this method in a similar way
  });

  it('should open UpdatePasswordComponent dialog on updatePassword()', () => {
    const mockUserProfile = { /* mock user profile data */ };
    component.userProfile = mockUserProfile;
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    dialog.open.and.returnValue(dialogRefSpyObj);

    component.updatePassword();

    expect(dialog.open).toHaveBeenCalledWith(UpdatePasswordComponent, { width: '400px', data: { userProfile: mockUserProfile } });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(component.getUserProfile).toHaveBeenCalled(); // Mock this method in a similar way
  });
});
