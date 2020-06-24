import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/entities/Customer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {
  filteredCustomers: Customer[] = [];
  filteredName: Customer[] = [];
  filteredAddress: Customer[] = [];
  private _customers: Customer[] = [];

  searchName = '';
  searchAddress = '';

  @Input() get customers() {
    return this._customers;
  }
  set customers(value: Customer[]) {
    if (value) {
      this._customers = this.filteredCustomers = value;
    }
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  filterName(data: string) {
    this.searchName = data;
    if (data) {
      if (this.searchAddress) {
        this.filteredCustomers = this.filteredAddress.filter((cust: Customer) => {
            const customerName = cust.FirstName + ' ' + cust.LastName;
            return customerName.toLowerCase().indexOf(data.toLowerCase()) > -1;
        });
      }
      else {
        this.filteredCustomers = this.filteredName = this.customers.filter((cust: Customer) => {
            const customerName = cust.FirstName + ' ' + cust.LastName;
            return customerName.toLowerCase().indexOf(data.toLowerCase()) > -1;
        });
      }
    }
    else {
        this.filteredCustomers = this.customers;

        if (this.searchAddress) {
          this.filterAddress(this.searchAddress);
        }
    }
  }

  filterAddress(data: string) {
    this.searchAddress = data;
    if (data) {
      if (this.searchName) {
        this.filteredCustomers = this.filteredName.filter((cust: Customer) => {
          return cust.Address.toLowerCase().indexOf(data.toLowerCase()) > -1;
        });
      }
      else {
        this.filteredCustomers = this.filteredAddress = this.customers.filter((cust: Customer) => {
          return cust.Address.toLowerCase().indexOf(data.toLowerCase()) > -1;
        });
      }
    }
    else {
      this.filteredCustomers = this.customers;

      if (this.searchName) {
        this.filterName(this.searchName);
      }
    }
  }

  openProfile(customer: Customer) {
    this.router.navigate(['profile/' + customer.Id]);
  }
}
