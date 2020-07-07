import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerDetails } from 'src/app/model/CustomerDetails';
import { CustomerService } from 'src/app/services/http-service/customer.service';
import { NodeWithI18n } from '@angular/compiler';
import { PurchaseService } from 'src/app/services/http-service/purchase.service';
import { Purchase } from 'src/app/entities/Purchase';
import { mergeMap, map } from 'rxjs/operators';
import { Customer } from 'src/app/entities/Customer';

@Component({
  selector: 'app-profile',
  templateUrl: '../profile.component.html',
  styleUrls: ['../profile.component.css']
})
export class ProfileComponent implements OnInit {
  customer: CustomerDetails;
  purchases: Purchase[] = [];

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private purchaseService: PurchaseService) { }

  async ngOnInit() {
    const conditionPurchase = new Purchase();
    await this.customerService.getById(+this.route.snapshot.paramMap.get('id')).then(customer => {

      if (customer) {
       this.customer = new CustomerDetails(customer);
       conditionPurchase.CustomerId = customer.Id;
      }
      else {
        alert ('Can\'t find customer details');
      }
    }).catch(error => {
      console.log(error);
      alert ('Can\'t find customer details');
    });

    this.purchaseService.find(conditionPurchase).then(purchases => {
      this.purchases = purchases;
    }).catch(error => {
      console.log(error);
    });
  }

  async update() {
    await this.customerService.update(this.customer.Info).then(resp => {

      if (resp.ok) {
        alert('Successfully updated profile');
      }
      else {
        alert('Can\'t update profile right now');
        this.customerService.getById(+this.route.snapshot.paramMap.get('id')).then(customer => {
        this.customer = new CustomerDetails(customer);
        });
      }
    });
  }
}
