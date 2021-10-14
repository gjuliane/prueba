import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'add', component: AddComponent },
      { path: 'list', component: ListComponent },
      { path: 'edit/:id', component: AddComponent },
      { path: '**', redirectTo: 'add' } // Default route is always this
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
