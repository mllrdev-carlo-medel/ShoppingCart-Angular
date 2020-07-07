import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CartComponent } from './pages/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@NgModule({
    imports: [ CommonModule, FormsModule, CartRoutingModule ],
    declarations: [ CartComponent, CartItemComponent ]
})
export class CartModule { }
