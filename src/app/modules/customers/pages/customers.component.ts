import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/entities/Customer';
import { CustomerService } from 'src/app/services/http-service/customer.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal-services/modal-service';
import { SignUpComponent } from '../components/customer-signup/sign-up.component';

@Component({
  selector: 'app-customers',
  templateUrl: '../customers.component.html',
  styleUrls: ['../customers.component.css']
})

export class CustomersComponent implements OnInit {
  title = 'Customers';
  id = '';

  customers: Customer[];

  constructor(private modalService: ModalService,
              private customerService: CustomerService,
              private router: Router) { }

  async ngOnInit() {
    await this.customerService.getAll().then((customers: Customer[]) => this.customers = customers);
  }

  async logIn() {
    if (this.id) {
      await this.customerService.getById(+this.id).then((customer: Customer) => {

        if (customer) {
          this.router.navigate([`profile/${this.id}`]);
        }
        else {
          alert('Can\'t find customer');
        }
      }).catch(error => {
        console.log(error);
        alert('Can\'t find customer');
      });
    }
    else {
       alert('Please enter customer ID');
    }
  }

  signUp() {
    this.modalService.init(SignUpComponent, {}, {});
  }
}
