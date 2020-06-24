import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PurchaseDetails } from 'src/app/model/PurchaseDetails';
import { PurchaseItemService } from 'src/app/services/http-service/purchaseItem.service';
import { ItemService } from 'src/app/services/http-service/item.service';
import { PurchaseItem } from 'src/app/entities/PurchaseItem';
import { Item } from 'src/app/entities/Item';
import { SorterService } from 'src/app/services/sorter-service';

@Component({
  selector: 'app-cart',
  templateUrl: '../cart.component.html',
  styleUrls: ['../cart.component.css']
})

export class CartComponent implements OnInit {
  purchaseDetails: PurchaseDetails[] = [];
  grandTotal = 0;
  items: Item[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private purchaseItemService: PurchaseItemService,
              private sorterService: SorterService,
              private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.purchaseDetails = [];
    const conditionPurchaseItem = new PurchaseItem();
    conditionPurchaseItem.PurchaseId = +this.route.snapshot.paramMap.get('id');
    this.purchaseItemService.find(conditionPurchaseItem).subscribe((purchaseItems: PurchaseItem[]) => {
      purchaseItems.forEach(purchaseItem => {
        this.itemService.getById(purchaseItem.ItemId).subscribe (item => {
        this.purchaseDetails.push(new PurchaseDetails(purchaseItem, item));
        this.sorterService.sort(this.purchaseDetails, 'Name');
        this.computeTotal();
        });
      });
    });

    this.itemService.getAll().subscribe(items => this.items = items);
  }

  computeTotal() {
    let total = 0;
    this.purchaseDetails.forEach(x => total += x.PurchaseItem.Price * x.PurchaseItem.Quantity);
    this.grandTotal = +total.toFixed(2);
  }

  checkout() {
    this.router.navigate(['checkout/' + +this.route.snapshot.paramMap.get('id') + '/' +
                         +this.route.snapshot.paramMap.get('profileId')]);
  }

  removeAll() {
    const purchaseItems = new Array<PurchaseItem>();
    this.purchaseDetails.forEach(purchaseDetail => {
     purchaseItems.push(purchaseDetail.PurchaseItem);
    });

    this.purchaseItemService.delete(purchaseItems).subscribe(status => {
      if (status.ok) {
        this.loadData();
      }
      else {
        alert('Can\'t delete. Please try agagin');
      }
    });
  }

  addItems() {
    this.router.navigate(['items/' + +this.route.snapshot.paramMap.get('id') + '/' +
                         +this.route.snapshot.paramMap.get('profileId')]);
  }

  profile() {
    this.router.navigate(['profile/' + +this.route.snapshot.paramMap.get('profileId')]);
  }
}
