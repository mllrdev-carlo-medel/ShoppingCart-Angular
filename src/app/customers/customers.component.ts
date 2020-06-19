import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../entities/Customer';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  title = 'Customers';
  id = '';

  customers: Customer[];

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.customerService.getAll().subscribe((customers: Customer[]) => this.customers = customers);
  }

  logIn() {
    if (this.id) {
      this.router.navigate(['profile/' + this.id]);
    }
    else {
       alert('Please enter customer ID');
    }
  }

  signUp() {
    this.router.navigate(['sign-up/']);
  }
}
