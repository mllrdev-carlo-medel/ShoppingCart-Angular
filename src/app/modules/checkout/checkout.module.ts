import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './pages/checkout.component';


@NgModule({
  imports: [ CommonModule, FormsModule, CheckoutRoutingModule ],
  declarations: [ CheckoutComponent ],
})

export class CheckoutModule { }
