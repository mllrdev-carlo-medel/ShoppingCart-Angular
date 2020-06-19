import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';


@NgModule({
  imports: [ CommonModule, FormsModule, ItemsRoutingModule ],
  declarations: [ ItemsComponent ],
})

export class ItemsModule { }
