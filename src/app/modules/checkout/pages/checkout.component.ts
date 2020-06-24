import { Component, OnInit } from '@angular/core';
import { PurchaseDetails } from 'src/app/model/PurchaseDetails';
import { PurchaseService } from 'src/app/services/http-service/purchase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseItem } from '../../../entities/PurchaseItem';
import { PurchaseItemService } from '../../../services/http-service/purchaseItem.service';
import { ItemService } from '../../../services/http-service/item.service';
import { formatDate } from '@angular/common';
import { ProfileStringConstants } from '../../../shared/constants/profile-string-constants';
import { Purchase } from '../../../entities/Purchase';

@Component({
  selector: 'app-checkout',
  templateUrl: '../checkout.component.html',
  styleUrls: ['../checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  purchaseDetails: PurchaseDetails[] = [];

  grandTotal = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private purchaseService: PurchaseService,
              private purchaseItemService: PurchaseItemService,
              private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadData();
  }

  computeTotal() {
    let total = 0;
    this.purchaseDetails.forEach(x => total += x.PurchaseItem.Price * x.PurchaseItem.Quantity);
    this.grandTotal = +total.toFixed(2);
  }

  loadData() {
    this.purchaseDetails = [];
    const conditionPurchaseItem = new PurchaseItem();
    conditionPurchaseItem.PurchaseId = +this.route.snapshot.paramMap.get('id');
    this.purchaseItemService.find(conditionPurchaseItem).subscribe((purchaseItems: PurchaseItem[]) => {

      purchaseItems.forEach(purchaseItem => {
        this.itemService.getById(purchaseItem.ItemId).subscribe (item => {
        this.purchaseDetails.push(new PurchaseDetails(purchaseItem, item));
        this.computeTotal();
        });
      });
    });
  }

  viewCart() {
    this.router.navigate(['cart/' + this.route.snapshot.paramMap.get('id') + '/' + this.route.snapshot.paramMap.get('profileId')]);
  }

  profile() {
    this.router.navigate(['profile/' + +this.route.snapshot.paramMap.get('profileId')]);
  }

  placeOrder() {
    this.computeTotal();
    if (this.grandTotal > 0) {
      this.purchaseService.getById(+this.route.snapshot.paramMap.get('id')).subscribe((purchase: Purchase) => {
        purchase.Status = ProfileStringConstants.PURCHASED;
        purchase.Date = formatDate(new Date(), 'MM/dd/yyyy HH:mm:ss', 'en-US');
        purchase.Total = this.grandTotal;

        this.purchaseService.update(purchase).subscribe(resp => {

          if (resp.ok) {
            alert('Thank you. Please come again.');
            this.profile();
          }
          else {
            alert('Can\'t proceed at the moment. Please try again');
          }
        });
      });
    }
    else {
      alert('Please add item(s) to your cart.');
    }
  }
}
