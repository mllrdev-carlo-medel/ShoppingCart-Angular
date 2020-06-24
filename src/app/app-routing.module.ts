import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from 'src/app/modules/cart/pages/cart.component';
import { ProfileComponent } from 'src/app/modules/profile/pages/profile.component';
import { ItemsComponent } from 'src/app/modules/items/pages/items.component';
import { InventoryComponent } from 'src/app/modules/inventory/pages/inventory.component';
import { PurchaseHistoryComponent } from './modules/purchase-history/pages/purchase-history.component';
import { CheckoutComponent } from './modules/checkout/pages/checkout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/customers'},
  { path: 'profile/:id', pathMatch: 'full', component: ProfileComponent },
  { path: 'cart/:id/:profileId', pathMatch: 'full', component: CartComponent },
  { path: 'checkout/:id/:profileId', pathMatch: 'full', component: CheckoutComponent },
  { path: 'items/:purchaseId/:profileId', pathMatch: 'full', component: ItemsComponent },
  { path: 'inventory', pathMatch: 'full', component: InventoryComponent },
  { path: 'purchase-history', pathMatch: 'full', component: PurchaseHistoryComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/customers'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
