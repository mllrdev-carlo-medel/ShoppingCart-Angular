import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/http-service/customer.service';
import { Customer } from 'src/app/entities/Customer';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal-services/modal-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  id = 0;
  customer = new Customer();

  constructor(private modalService: ModalService,
              private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {
    this.customer.Gender = 'male';
  }

  public close() {
    this.modalService.destroy();
  }

   async signUp() {
    if (this.customer.FirstName && this.customer.LastName && this.customer.Address) {
      if (!this.customer.FirstName.trim() || !this.customer.LastName.trim() || !this.customer.Address.trim()) {
        alert ('All fields with \'*\' must be filled up.');
      }
      else {
        await this.customerService.add(this.customer).then ((id: number) => {
          this.router.navigate([`profile/${id}`]);
        });
      }
    }
    else {
      alert ('All fields with \'*\' must be filled up.');
    }
  }
}
