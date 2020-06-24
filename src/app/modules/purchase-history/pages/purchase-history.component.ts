import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../../services/http-service/purchase.service';
import { Purchases } from '../../../model/Purchases';
import { CustomerService } from '../../../services/http-service/customer.service';
import { Route } from '@angular/compiler/src/core';
import { Purchase } from '../../../entities/Purchase';
import { Customer } from '../../../entities/Customer';
import { Router } from '@angular/router';
import { SorterService } from 'src/app/services/sorter-service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: '../purchase-history.component.html',
  styleUrls: ['../purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  purchases: Purchases[] = [];
  selectedPurchase: Purchases = null;

  constructor(private purchaseService: PurchaseService,
              private customerService: CustomerService,
              private sorterService: SorterService,
              private router: Router) { }

  ngOnInit() {
    this.purchaseService.getAll().subscribe((purchases: Purchase[] ) => {
      this.sorterService.sort(purchases, 'Date');
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
