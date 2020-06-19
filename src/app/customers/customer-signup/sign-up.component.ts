import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../entities/Customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  id = 0;
  customer = new Customer();

  constructor(private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    if (this.customer.FirstName && this.customer.LastName && this.customer.Address &&
        this.customer.Gender && this.customer.ContactNo && this.customer.Email) {
      this.customerService.add(this.customer).subscribe ((id: number) => {
        this.router.navigate(['profile/' + id]);
      });
    }
    else {
      alert ('All fields with \'*\' must be filled up.');
    }
  }
}
