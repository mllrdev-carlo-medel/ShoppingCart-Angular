import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomersComponent } from './customers.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { FilterTextboxComponent } from './customer-list/filter-textbox.component';
import { CustomersRoutingModule } from './customer-routing.module';
import { SignUpComponent } from './customer-signup/sign-up.component';

@NgModule({
  imports: [ CommonModule, FormsModule, CustomersRoutingModule ],
  declarations: [ CustomersComponent, CustomerListComponent, FilterTextboxComponent, SignUpComponent ],
  exports: [ CustomersComponent ]
})

export class CustomersModule { }
