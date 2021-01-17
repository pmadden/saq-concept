import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultsComponent } from '@saq/store/search';
import { HomeComponent } from '@saq/store/home';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'search/:term',
    component: SearchResultsComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'ignore', scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
