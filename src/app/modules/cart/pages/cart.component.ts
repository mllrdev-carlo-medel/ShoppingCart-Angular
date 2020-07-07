import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PurchaseDetails } from 'src/app/model/PurchaseDetails';
import { PurchaseItemService } from 'src/app/services/http-service/purchaseItem.service';
import { ItemService } from 'src/app/services/http-service/item.service';
import { PurchaseItem } from 'src/app/entities/PurchaseItem';
import { Item } from 'src/app/entities/Item';
import { SorterService } from 'src/app/services/sorter-service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-cart',
  templateUrl: '../cart.component.html',
  styleUrls: ['../cart.component.css']
})

export class CartComponent implements OnInit {
  purchaseDetails: PurchaseDetails[] = [];
  grandTotal = 0;
  items: Item[] = [];

  deletedPurchaseItems: PurchaseItem[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private purchaseItemService: PurchaseItemService,
              private sorterService: SorterService,
              private itemService: ItemService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.purchaseDetails = [];
    let purchaseItems = [];
    const conditionPurchaseItem = new PurchaseItem();
    conditionPurchaseItem.PurchaseId = +this.route.snapshot.paramMap.get('id');
    await this.purchaseItemService.find(conditionPurchaseItem).then((data: PurchaseItem[]) => {
      purchaseItems = data;
    });

    purchaseItems.forEach(async purchaseItem => {
      await this.itemService.getById(purchaseItem.ItemId).then (item => {
      this.purchaseDetails.push(new PurchaseDetails(purchaseItem, item));
      this.sorterService.sort(this.purchaseDetails, 'Name');
      this.computeTotal();
      });
    });

    await this.itemService.getAll().then(items => {
      this.items = items;
    }).catch(err => console.log(err));
  }

  async saveData() {
    await this.purchaseItemService.delete(this.deletedPurchaseItems).then(status => {
      if (!status.ok) {
        console.log ('can\'t delete item');
      }
    }).catch(error => {
      console.log(error);
    });

    this.purchaseDetails.forEach(async (purchaseDetail: PurchaseDetails) => {
      await this.purchaseItemService.update(purchaseDetail.PurchaseItem).then(status => {

        if (!status.ok) {
          console.log ('can\'t update item');
          alert ('Can\'t update. Please try again.');
        }
      }).catch(error => {
        console.log(error);
      });
    });
  }

  deleteItem(purchaseDetail: PurchaseDetails) {
    this.deletedPurchaseItems.push(purchaseDetail.PurchaseItem);
    this.purchaseDetails.splice(this.purchaseDetails.indexOf(purchaseDetail), 1);
  }

  computeTotal() {
    let total = 0;
    this.purchaseDetails.forEach(x => total += x.PurchaseItem.Price * x.PurchaseItem.Quantity);
    this.grandTotal = +total.toFixed(2);
  }

  async checkout() {
    await this.saveData();
    this.router.navigate([`checkout/${+this.route.snapshot.paramMap.get('id')}/${+this.route.snapshot.paramMap.get('profileId')}`]);
  }

  async removeAll() {
    const purchaseItems = new Array<PurchaseItem>();
    if (this.purchaseDetails.length > 0) {
      this.purchaseDetails.forEach(purchaseDetail => {
        purchaseItems.push(purchaseDetail.PurchaseItem);
      });

      await this.purchaseItemService.delete(purchaseItems).then(status => {
        if (status.ok) {
          this.getData();
        }
        else {
          alert('Can\'t delete. Please try agagin');
        }
      }).catch(error => {
        console.log(error);
        alert('Can\'t remove all items');
      });
    }
    else {
      alert ('No items in cart.');
    }
  }

  async addItems() {
    await this.saveData();
    this.router.navigate([`items/${+this.route.snapshot.paramMap.get('id')}/${+this.route.snapshot.paramMap.get('profileId')}`]);
  }

  async profile() {
    await this.saveData();
    this.router.navigate([`profile/${+this.route.snapshot.paramMap.get('profileId')}`]);
  }
}
