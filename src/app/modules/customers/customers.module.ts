import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomersComponent } from './pages/customers.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { FilterTextboxComponent } from './components/customer-list/filter-textbox.component';
import { CustomersRoutingModule } from './customer-routing.module';
import { SignUpComponent } from './components/customer-signup/sign-up.component';

@NgModule({
  imports: [ CommonModule, FormsModule, CustomersRoutingModule ],
  declarations: [ CustomersComponent, CustomerListComponent, FilterTextboxComponent, SignUpComponent ],
  exports: [ CustomersComponent ]
})

export class CustomersModule { }
