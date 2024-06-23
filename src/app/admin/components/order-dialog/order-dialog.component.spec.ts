import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderDialogComponent } from './order-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OrderDialogComponent', () => {
  let component: OrderDialogComponent;
  let fixture: ComponentFixture<OrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDialogComponent],
      imports: [NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { street: 'Test Street', streetNumber: '123', city: 'Test City', state: 'Test State', zip: '12345', phone: '1234567890' } },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display order details', () => {
    const compiled = fixture.nativeElement;
    const paragraphs = compiled.querySelectorAll('p');

    expect(paragraphs[0].textContent).toContain('Street: Test Street');
    expect(paragraphs[1].textContent).toContain('Street Number: 123');
    expect(paragraphs[2].textContent).toContain('City: Test City');
    expect(paragraphs[3].textContent).toContain('State: Test State');
    expect(paragraphs[4].textContent).toContain('Zip: 12345');
    expect(paragraphs[5].textContent).toContain('Phone: 1234567890');
  });

  it('should close the dialog on closeForm', () => {
    component.closeForm();
    expect(TestBed.inject(MatDialogRef).close).toHaveBeenCalled();
  });
});
