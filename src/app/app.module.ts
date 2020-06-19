import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/service.module';
import { CustomersModule } from './customers/customers.module';
import { ProfileModule } from './profile/profile.module';
import { CartModule } from './cart/cart.module';
import { ItemsModule } from './items/items.module';
import { InventoryModule } from './inventory/inventory.module';
import { PurchaseHistoryModule } from './purchase-history/purchase-history.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServiceModule,
    CustomersModule,
    ProfileModule,
    CartModule,
    ItemsModule,
    InventoryModule,
    PurchaseHistoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
