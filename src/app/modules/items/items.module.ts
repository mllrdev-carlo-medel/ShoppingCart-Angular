import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './pages/items.component';
import { FilterTextboxComponent } from './components/filter-textbox.component';


@NgModule({
  imports: [ CommonModule, FormsModule, ItemsRoutingModule ],
  declarations: [ ItemsComponent, FilterTextboxComponent ],
})

export class ItemsModule { }
