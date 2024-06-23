import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CustomerService } from '../../service/customer.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let customerService: CustomerService;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
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
      providers: [CustomerService]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    customerService = TestBed.inject(CustomerService);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component and create the form', () => {
    expect(component).toBeTruthy();
    expect(component.searchProductForm).toBeTruthy();
    expect(component.searchProductForm.contains('title')).toBe(true);
    expect(component.searchProductForm.get('title')?.valid).toBe(false);
  });

  it('should fetch all products and process them correctly', () => {
    const mockProducts = [
      { byteImg: 'base64encodedstring1', imageFormat: 'jpeg' },
      { byteImg: 'base64encodedstring2', imageFormat: 'png' }
    ];

    spyOn(customerService, 'getAllProducts').and.returnValue(of(mockProducts));

    component.getAllProducts();

    expect(component.products.length).toBe(2);
    expect(component.products[0].processedImg).toContain('data:image/jpeg;base64,base64encodedstring1');
    expect(component.products[1].processedImg).toContain('data:image/png;base64,base64encodedstring2');
  });

  it('should fetch products by name when form is submitted', () => {
    const mockProducts = [
      { byteImg: 'base64encodedstring1', imageFormat: 'jpeg' }
    ];

    spyOn(customerService, 'getAllProductsByName').and.returnValue(of(mockProducts));
    component.searchProductForm.controls['title'].setValue('test');

    component.submitForm();

    expect(component.products.length).toBe(1);
    expect(component.products[0].processedImg).toContain('data:image/jpeg;base64,base64encodedstring1');
  });

  it('should add a product to the cart and show snackbar notification', () => {
    spyOn(customerService, 'addToCart').and.returnValue(of({}));
    spyOn(snackBar, 'open');

    component.addToCart(1);

    expect(customerService.addToCart).toHaveBeenCalledWith(1);
    expect(snackBar.open).toHaveBeenCalledWith('Product has been added to the cart', 'Close', { duration: 5000 });
  });
});
