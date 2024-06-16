import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderByStatusComponent } from './order-by-status.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OrderByStatusComponent', () => {
  let component: OrderByStatusComponent;
  let fixture: ComponentFixture<OrderByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderByStatusComponent ],
      imports: [
        MatCardModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderByStatusComponent);
    component = fixture.componentInstance;
    component.data = { placed: 10, confirmed: 5, shipped: 3 }; // Provide a mock input
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
