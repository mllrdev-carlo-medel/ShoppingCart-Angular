import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InventoryComponent } from './pages/inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { FilterTextboxComponent } from './components/filter-textbox.component';
import { InventoryDialogBoxComponent } from './components/inventory-dialogbox/inventory-dialogbox.component';

@NgModule({
  imports: [ CommonModule, FormsModule, InventoryRoutingModule ],
  declarations: [ InventoryComponent, FilterTextboxComponent ],
  entryComponents: [ InventoryDialogBoxComponent ]
})

export class InventoryModule { }
