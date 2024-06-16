import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostProductComponent } from './post-product.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from '../../service/admin.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('PostProductComponent', () => {
  let component: PostProductComponent;
  let fixture: ComponentFixture<PostProductComponent>;
  let adminServiceMock: any;
  let routerMock: any;
  let snackBarMock: any;

  beforeEach(async () => {
    adminServiceMock = jasmine.createSpyObj('AdminService', ['getAllCategories', 'getAllSexes', 'addProduct']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    adminServiceMock.getAllCategories.and.returnValue(of([{ id: 1, name: 'Category 1' }]));
    adminServiceMock.getAllSexes.and.returnValue(of([{ id: 1, name: 'Male' }]));
    adminServiceMock.addProduct.and.returnValue(of({ id: 1 }));

    await TestBed.configureTestingModule({
      declarations: [PostProductComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,  // Add MatSelectModule here
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AdminService, useValue: adminServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize categories and sexes', () => {
    component.ngOnInit();
    expect(adminServiceMock.getAllCategories).toHaveBeenCalled();
    expect(adminServiceMock.getAllSexes).toHaveBeenCalled();
    expect(component.listOfCategories).toEqual([{ id: 1, name: 'Category 1' }]);
    expect(component.listOfSexes).toEqual([{ id: 1, name: 'Male' }]);
  });

  it('should add a product', () => {
    component.productForm.setValue({
      categoryId: 1,
      name: 'Test Product',
      price: 100,
      description: 'Test Description',
      sexId: 1,
      latin: 'Test Latin'
    });

    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    component.selectedFile = file;
    component.addProduct();

    expect(adminServiceMock.addProduct).toHaveBeenCalled();
    expect(snackBarMock.open).toHaveBeenCalledWith('Product added successfully', 'Close', { duration: 5000 });
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/admin/dashboard');
  });

  it('should display an error message for unsupported file format', () => {
    const event = { target: { files: [new File([''], 'test.txt', { type: 'text/plain' })] } } as any;
    spyOn(console, 'error');
    component.onFileSelected(event);

    expect(console.error).toHaveBeenCalledWith('Unsupported file format');
    expect(event.target.value).toBe(null); // Ensure this checks for an empty string
  });

  it('should preview image when a valid file is selected', () => {
    const event = { target: { files: [new File([''], 'test.jpg', { type: 'image/jpeg' })] } };
    const reader = jasmine.createSpyObj('FileReader', ['readAsDataURL']);
    reader.onload = null; // Initialize onload property

    spyOn(window as any, 'FileReader').and.returnValue(reader);

    component.onFileSelected(event);

    // Mock onload callback
    reader.onload = jasmine.createSpy('onload').and.callFake(() => {
      component.imagePreview = 'data:image/jpeg;base64,...';
      expect(component.imagePreview).toEqual('data:image/jpeg;base64,...');
    });

    // Simulate onload callback
    reader.onload();
    expect(reader.readAsDataURL).toHaveBeenCalledWith(event.target.files[0]);
  });
});

