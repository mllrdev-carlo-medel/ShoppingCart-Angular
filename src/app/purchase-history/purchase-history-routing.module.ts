import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseHistoryComponent } from './purchase-history.component';

const routes: Routes = [
    { path: 'purchase-history', component: PurchaseHistoryComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PurchaseHistoryRoutingModule {

}
