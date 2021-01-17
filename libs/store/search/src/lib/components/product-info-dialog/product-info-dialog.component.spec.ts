import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductInfoDialogComponent } from './product-info-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('ProductInfoDialogComponent', () => {
  let component: ProductInfoDialogComponent;
  let fixture: ComponentFixture<ProductInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      declarations: [ ProductInfoDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
