import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
    imports: [ CommonModule, FormsModule, CartRoutingModule ],
    declarations: [ CartComponent ]
})
export class CartModule { }
