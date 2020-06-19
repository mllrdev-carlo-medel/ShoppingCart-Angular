import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../services/purchase.service';
import { Purchases } from '../model/Purchases';
import { CustomerService } from '../services/customer.service';
import { Route } from '@angular/compiler/src/core';
import { Purchase } from '../entities/Purchase';
import { Customer } from '../entities/Customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  purchases: Purchases[] = [];
  selectedPurchase: Purchases = null;

  constructor(private purchaseService: PurchaseService,
              private customerService: CustomerService,
              private router: Router) { }

  ngOnInit() {
    this.purchaseService.getAll().subscribe((purchases: Purchase[] ) => {
      purchases.forEach(purchase => {
        this.customerService.getById(purchase.CustomerId).subscribe((customer: Customer) => {
          const name = customer.FirstName + ' ' + customer.MiddleName + ' ' + customer.LastName;
          const record = new Purchases(name, purchase);
          this.purchases.push(record);
        });
      });
    });
  }

  openProfile(purchase: Purchases) {
    this.selectedPurchase = purchase;
    this.router.navigate(['profile/' + purchase.Purchase.CustomerId]);
  }
}
