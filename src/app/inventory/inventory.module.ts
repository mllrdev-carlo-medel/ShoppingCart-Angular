import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';

@NgModule({
  imports: [ CommonModule, FormsModule, InventoryRoutingModule ],
  declarations: [ InventoryComponent ]
})

export class InventoryModule { }
