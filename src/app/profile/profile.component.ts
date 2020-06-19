import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerDetails } from '../model/CustomerDetails';
import { CustomerService } from '../services/customer.service';
import { NodeWithI18n } from '@angular/compiler';
import { PurchaseService } from '../services/purchase.service';
import { Purchase } from '../entities/Purchase';
import { PurchaseHistory } from '../model/PurchaseHistory';
import { merge } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Customer } from '../entities/Customer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customer: CustomerDetails;
  purchases: Purchase[] = [];

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    const conditionPurchase = new Purchase();
    this.customerService.getById(+this.route.snapshot.paramMap.get('id')).pipe(
      map((customer: Customer) => {

        if (customer) {
          this.customer = new CustomerDetails(customer);
          conditionPurchase.CustomerId = customer.Id;
        }
        else {
          alert ('Can\'t find customer details');
        }

        return customer;
      }),
      mergeMap(customer =>
        this.purchaseService.find(conditionPurchase))
    ).subscribe((purchases: Purchase[]) => {
      this.purchases = purchases;
    });
  }

  update() {
    this.customerService.update(this.customer.Info).subscribe(resp => {

      if (resp.ok) {
        alert('Successfully updated profile');
      }
      else {
        alert('Can\'t update profile right now');
        this.customerService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(customer => {
        this.customer = new CustomerDetails(customer);
        });
      }
    });
  }
}
