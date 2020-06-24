import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout.component';

const routes: Routes = [
    { path: 'checkout/:id/:profileId/', component: CheckoutComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class CheckoutRoutingModule {

}
