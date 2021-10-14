import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'persons',
    loadChildren: () => import('./persons/persons.module').then( m => m.PersonsModule ),
  },
  {
    path: '**',
    redirectTo: 'persons'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
