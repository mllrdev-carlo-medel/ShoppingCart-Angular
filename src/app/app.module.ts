import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/service.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ProfileModule } from './modules/profile/profile.module';
import { CartModule } from './modules/cart/cart.module';
import { ItemsModule } from './modules/items/items.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { PurchaseHistoryModule } from './modules/purchase-history/purchase-history.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServiceModule,
    CustomersModule,
    ProfileModule,
    CartModule,
    ItemsModule,
    InventoryModule,
    PurchaseHistoryModule,
    CheckoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
