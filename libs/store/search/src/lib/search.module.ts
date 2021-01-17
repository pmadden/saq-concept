import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OmniboxComponent } from './components/omnibox/omnibox.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductInfoDialogComponent } from './components/product-info-dialog/product-info-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [OmniboxComponent, SearchResultsComponent, ProductInfoDialogComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [OmniboxComponent, ProductInfoDialogComponent, SearchResultsComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ]
})
export class SearchModule { }
