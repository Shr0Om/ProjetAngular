import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
