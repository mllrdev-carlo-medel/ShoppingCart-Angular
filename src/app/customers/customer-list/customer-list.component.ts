import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../entities/Customer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {
  filteredCustomers: Customer[] = [];
  private _customers: Customer[] = [];

  @Input() get customers() {
    return this._customers;
  }
  set customers(value: Customer[]) {
    if (value) {
      this._customers = this.filteredCustomers = value;
    }
  }

  constructor(private router: Router) { }

  ngOnInit(): void { }

  filter(data: string) {
    if (data) {
      this.filteredCustomers = this.customers.filter((cust: Customer) => {
          return cust.FirstName.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                 cust.LastName.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                 cust.Address.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } else {
        this.filteredCustomers = this.customers;
    }
  }

  openProfile(customer: Customer) {
    this.router.navigate(['profile/' + customer.Id]);
  }
}
