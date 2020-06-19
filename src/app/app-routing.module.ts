import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { ItemsComponent } from './items/items.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/customers'},
  { path: 'profile/:id', pathMatch: 'full', component: ProfileComponent },
  { path: 'cart/:id/:profileId', pathMatch: 'full', component: CartComponent },
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
