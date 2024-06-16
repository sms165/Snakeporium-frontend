import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProductComponent } from './update-product.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatRadioModule } from '@angular/material/radio'; // Import MatRadioModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from '../../service/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import MAT_DIALOG_DATA
import { of } from 'rxjs';

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;

  // Mock MatDialogRef
  const matDialogRefMock = {
    close: jasmine.createSpy('close') // Add any methods your component uses
  };

  // Mock AdminService
  const adminServiceMock = {
    getAllCategories: jasmine.createSpy('getAllCategories').and.returnValue(of([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' }
    ])),
    getAllSexes: jasmine.createSpy('getAllSexes').and.returnValue(of([
      { id: 1, name: 'Male' },
      { id: 2, name: 'Female' }
    ])),
    getProductById: jasmine.createSpy('getProductById').and.returnValue(of({
      categoryId: 1,
      sexId: 1,
      latin: 'Latin Name',
      name: 'Product Name',
      price: 100,
      description: 'Product Description',
      imageFormat: 'jpeg',
      byteImg: 'base64string'
    })),
    updateProduct: jasmine.createSpy('updateProduct').and.returnValue(of({ id: 1 }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProductComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule, // Include MatSelectModule
        MatRadioModule, // Include MatRadioModule
        BrowserAnimationsModule,
        MatTableModule // Include MatTableModule here
      ],
      providers: [
        { provide: AdminService, useValue: adminServiceMock }, // Provide mock AdminService
        { provide: MatDialogRef, useValue: matDialogRefMock }, // Provide mock MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} } // Provide mock for MAT_DIALOG_DATA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
