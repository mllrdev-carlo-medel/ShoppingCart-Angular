import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CustomerService } from './http-service/customer.service';
import { ItemService } from './http-service/item.service';
import { PurchaseItemService } from './http-service/purchaseItem.service';
import { PurchaseService } from './http-service/purchase.service';
import { ModalService } from './modal-services/modal-service';
import { DomService } from './modal-services/dom-service';
import { SorterService } from './sorter-service';

@NgModule ({
  imports: [ HttpClientModule ],
  providers: [ CustomerService, ItemService, PurchaseItemService, PurchaseService, ModalService, DomService, SorterService ]
})

export class ServiceModule { }
