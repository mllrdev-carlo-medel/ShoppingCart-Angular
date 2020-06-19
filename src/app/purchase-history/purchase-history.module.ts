import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PurchaseHistoryRoutingModule } from './purchase-history-routing.module';
import { PurchaseHistoryComponent } from './purchase-history.component';


@NgModule({
  imports: [ CommonModule, FormsModule, PurchaseHistoryRoutingModule ],
  declarations: [ PurchaseHistoryComponent ],
})

export class PurchaseHistoryModule { }
