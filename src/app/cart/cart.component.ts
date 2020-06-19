import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PurchaseDetails } from '../model/PurchaseDetails';
import { PurchaseService } from '../services/purchase.service';
import { PurchaseItemService } from '../services/purchaseItem.service';
import { ItemService } from '../services/item.service';
import { PurchaseItem } from '../entities/PurchaseItem';
import { Item } from '../entities/Item';
import { Purchase } from '../entities/Purchase';
import { formatDate } from '@angular/common';
import { ProfileStringConstants } from '../shared/constants/profile-string-constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  purchaseDetails: PurchaseDetails[] = [];
  grandTotal = 0;
  selectedItemId = 0;
  selectedItem: PurchaseDetails;
  checkedItems: PurchaseItem[] = [];
  items: Item[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private purchaseService: PurchaseService,
              private purchaseItemService: PurchaseItemService,
              private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.selectedItem = null;
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

    this.itemService.getAll().subscribe(items => this.items = items);
  }

  setSelectedItemId(id: number) {
    this.selectedItemId = id;
    this.selectedItem = this.purchaseDetails.find((x: PurchaseDetails) => x.PurchaseItem.ItemId === id);
  }

  computeTotal() {
    let total = 0;
    this.purchaseDetails.forEach(x => total += x.PurchaseItem.Price * x.PurchaseItem.Quantity);
    this.grandTotal = +total.toFixed(2);
  }

  checkout() {
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

  update() {
    if (this.selectedItem) {
      const item = this.items.find(x => x.Id === this.selectedItem.PurchaseItem.ItemId);
      this.purchaseItemService.getById(this.selectedItem.PurchaseItem.Id).subscribe(purchaseItem => {
      const prevQuantity = purchaseItem.Quantity;

      if (+this.selectedItem.PurchaseItem.Quantity <= (item.Stocks + prevQuantity)
          && +this.selectedItem.PurchaseItem.Quantity > 0) {

          this.selectedItem.PurchaseItem.SubTotal = this.selectedItem.PurchaseItem.Price *
                                                    this.selectedItem.PurchaseItem.Quantity;

          item.Stocks -= (+this.selectedItem.PurchaseItem.Quantity - prevQuantity);

          this.purchaseItemService.update(this.selectedItem.PurchaseItem).subscribe(resp => {

            if (resp.ok) {
              this.loadData();
              this.itemService.update(item).subscribe();
            }
            else {
              alert('Can\'t update at the moment. Please try again');
            }
          });
        }
        else {
          this.loadData();
          alert('Can\'t update for that value');
        }
      });
    }
    else {
      alert('Please select an item');
    }
  }

  checkedItem(event: any, item: PurchaseDetails) {
    if (event.target.checked) {
      this.checkedItems.push(item.PurchaseItem);
    }
    else {
      const index = this.checkedItems.indexOf(item.PurchaseItem);
      this.checkedItems.splice(index, 1);
    }
  }

  remove() {
    if (this.checkedItems.length > 0) {
      const purchaseItemDel: PurchaseItem[] = [];

      this.checkedItems.forEach(x => {
        const purchaseItem = new PurchaseItem();
        purchaseItem.Id = x.Id;
        purchaseItemDel.push(purchaseItem);
      });

      this.purchaseItemService.delete(purchaseItemDel).subscribe(resp => {

        if (resp.ok) {
          this.loadData();

          this.checkedItems.forEach(x => {
            this.itemService.getById(x.ItemId).subscribe(item => {
              item.Stocks += x.Quantity;
              this.itemService.update(item).subscribe();
            });
          });
        }
      });
    }
    else {
      alert('Please select item(s)');
    }
  }

  addItems() {
    this.router.navigate(['items/' + +this.route.snapshot.paramMap.get('id') + '/' +
                         +this.route.snapshot.paramMap.get('profileId')]);
  }

  profile() {
    this.router.navigate(['profile/' + +this.route.snapshot.paramMap.get('profileId')]);
  }
}
