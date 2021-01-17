import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '@saq/shared/data';

@Component({
  selector: 'saq-product-info-dialog',
  templateUrl: './product-info-dialog.component.html',
  styleUrls: ['./product-info-dialog.component.scss']
})
export class ProductInfoDialogComponent implements OnInit {

  product: Product | undefined;

  constructor(public dialogRef: MatDialogRef<ProductInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { product: Product }) {
    this.product = data.product;
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
