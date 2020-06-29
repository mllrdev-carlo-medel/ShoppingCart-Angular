import { Component, OnInit, Input } from '@angular/core';
import { map, delay, mergeMap } from 'rxjs/operators';
import { PurchaseHistory } from 'src/app/model/PurchaseHistory';
import { CustomerDetails } from 'src/app/model/CustomerDetails';
import { Item } from 'src/app/entities/Item';
import { Purchase } from 'src/app/entities/Purchase';
import { PurchaseService } from 'src/app/services/http-service/purchase.service';
import { PurchaseItem } from 'src/app/entities/PurchaseItem';
import { PurchaseItemService } from 'src/app/services/http-service/purchaseItem.service';
import { ItemService } from 'src/app/services/http-service/item.service';
import { PurchaseDetails } from 'src/app/model/PurchaseDetails';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import {ProfileStringConstants } from 'src/app/shared/constants/profile-string-constants';
import { SorterService } from 'src/app/services/sorter-service';
import { ItemsDialogBoxComponent } from './items-dialogbox/items-dialogbox.component';
import { ModalService } from 'src/app/services/modal-services/modal-service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})

export class PurchaseHistoryComponent implements OnInit {
  purchaseDetails: PurchaseDetails[] = [];
  purchaseHistory: PurchaseHistory[] = [];
  purchaseId = 0;
  private _purchases: Purchase[] = [];

  @Input() get purchases() {
    return this._purchases;
  }
  set purchases(value: Purchase[]) {
    if (value) {
      this._purchases = value;
      this.sorterService.sort(this._purchases, 'Date');
      this.generateHistory();
    }
  }

  constructor(private purchaseService: PurchaseService,
              private purchaseItemService: PurchaseItemService,
              private itemService: ItemService,
              private sorterService: SorterService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: ModalService) { }

  ngOnInit() {}
  generateHistory() {
    this.purchaseHistory = [];

    this.purchases.forEach(async purchase => {
      const purchaseHistory = new PurchaseHistory(purchase);
      const conditionPurchaseItem = new PurchaseItem();
      conditionPurchaseItem.PurchaseId = purchase.Id;
      let purchaseItems = [];
      await this.purchaseItemService.find(conditionPurchaseItem).then((data: PurchaseItem[]) => {
        purchaseItems = data;
      });

      purchaseItems.forEach(async purchaseItem => {
        await this.itemService.getById(purchaseItem.ItemId).then (async item => {

          if (purchase.Status === ProfileStringConstants.PENDING) {
            purchaseItem.Price = item.Price;
            purchaseItem.SubTotal = purchaseItem.Quantity  * item.Price;
            await this.purchaseItemService.update(purchaseItem).then();
          }

          purchaseHistory.PurchaseDetails.push(new PurchaseDetails(purchaseItem, item));
        });
      });

      this.purchaseHistory.push(purchaseHistory);
    });
  }

  getPurchase(id: number) {
    this.purchaseId = id;
    const purchase = this.purchaseHistory.find(x => x.Purchase.Id === id);
    this.purchaseDetails = purchase.PurchaseDetails;
  }

  showItems(id: number) {
    const purchase = this.purchaseHistory.find(x => x.Purchase.Id === id);
    const inputs = {
      purchaseDetails: purchase.PurchaseDetails
    };

    this.modalService.init(ItemsDialogBoxComponent, inputs, {});
  }

  async deletePurchase() {
    if (this.purchaseId > 0) {
      const purchaseItemDel = new PurchaseItem();
      purchaseItemDel.PurchaseId = this.purchaseId;
      const purchaseDel = new Purchase();
      purchaseDel.Id = this.purchaseId;

      await this.purchaseService.getById(this.purchaseId).then(async purchase => {

        if (purchase.Status === ProfileStringConstants.PENDING) {
          await this.purchaseItemService.find(purchaseItemDel).then (purchaseItems => {

            purchaseItems.forEach(purchsaeItem => {
                this.itemService.getById(purchsaeItem.ItemId).then(item => {
                item.Stocks += purchsaeItem.Quantity;
                this.itemService.update(item).then();
              });
            });
          });
        }

        await this.purchaseItemService.delete([purchaseItemDel]).then(async response => {

          if (response.ok) {
            await this.purchaseService.delete([purchaseDel]).then(innerResponse => {

              if (innerResponse.ok) {
                const index = this.purchases.indexOf(this.purchases.find(x => x.Id === this.purchaseId));
                this.purchases.splice(index, 1);
                this.generateHistory();
                this.purchaseDetails = [];
                alert('Succesfully deleted!');
              }
            });
          }
        });
      });
    }
  }

  newPurchase() {
    const purchase = new Purchase();
    purchase.CustomerId = +this.route.snapshot.paramMap.get('id');
    purchase.Status = ProfileStringConstants.PENDING;
    purchase.Date = formatDate(new Date(), 'MM/dd/yyyy HH:mm:ss', 'en-US');
    purchase.Total = 0;

    const purchasePending = this.purchases.find(x => x.Status === ProfileStringConstants.PENDING);

    if (purchasePending) {
      this.router.navigate([`cart/${purchasePending.Id}/${purchase.CustomerId}`]);
    }
    else {
      this.purchaseService.add(purchase).then((id: number) => {
        this.router.navigate([`cart/${id}/${purchase.CustomerId}`]);
      });
    }
  }
}
