import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HelpersPipe } from './pipes/helpers.pipe';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    HelpersPipe,
    CardComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    ReactiveFormsModule
  ]
})
export class PersonsModule { }
