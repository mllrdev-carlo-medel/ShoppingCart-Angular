import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CustomerService } from './customer.service';
import { ItemService } from './item.service';
import { PurchaseItemService } from './purchaseItem.service';
import { PurchaseService } from './purchase.service';

@NgModule ({
  imports: [ HttpClientModule ],
  providers: [ CustomerService, ItemService, PurchaseItemService, PurchaseService ]
})

export class ServiceModule { }
