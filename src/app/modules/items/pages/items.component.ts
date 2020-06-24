import { Component, OnInit } from '@angular/core';
import { Item } from '../../../entities/Item';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseService } from 'src/app/services/http-service/purchase.service';
import { PurchaseItemService } from 'src/app/services/http-service/purchaseItem.service';
import { ItemService } from 'src/app/services/http-service/item.service';
import { PurchaseItem } from 'src/app/entities/PurchaseItem';

@Component({
  selector: 'app-items',
  templateUrl: '../items.component.html',
  styleUrls: ['../items.component.css']
})

export class ItemsComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  selectedItems: Item[] = [];
  searchString: string;
  purchaseId = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private purchaseService: PurchaseService,
              private purchaseItemService: PurchaseItemService,
              private itemService: ItemService) { }

  ngOnInit(): void {
    this.purchaseId = +this.route.snapshot.paramMap.get('purchaseId');
    this.getItems();
  }

  getItems() {
    this.itemService.getAll().subscribe(items => {
      this.items = this.filteredItems = items;
      const conditionPurchaseItem = new PurchaseItem();
      conditionPurchaseItem.PurchaseId = this.purchaseId;
      this.purchaseItemService.find(conditionPurchaseItem).subscribe((purchaseItems: PurchaseItem[]) => {
        this.items = [];

        items.forEach(item => {

          if (!purchaseItems.find(x => x.ItemId === item.Id)) {
            this.items.push(item);
          }
        });

        this.filteredItems = this.items;
      });
    });
  }

  filter(data: string) {
    if (data) {
      this.filteredItems = this.items.filter((item: Item) => {
          return item.Name.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } else {
        this.filteredItems = this.items;
    }
  }
  checkedItem(event: any, item: Item) {
    if (event.target.checked) {
      this.selectedItems.push(item);
    }
    else {
      const index = this.selectedItems.indexOf(item);
      this.selectedItems.splice(index, 1);
    }
  }

  addToCart() {
    this.searchString = '';
    if (this.selectedItems.length > 0) {
      this.selectedItems.forEach(item => {
        const purchaseItem = new PurchaseItem();
        purchaseItem.PurchaseId = this.purchaseId;
        purchaseItem.ItemId = item.Id;
        purchaseItem.Price = item.Price;
        purchaseItem.Quantity = 1;
        purchaseItem.SubTotal = item.Price;
        this.purchaseItemService.add(purchaseItem).subscribe((id: number) => {

          if (id > 0) {
            this.selectedItems = [];
            this.getItems();
          }

          item.Stocks -= 1;
          this.itemService.update(item).subscribe();
        });
      });
    }
    else {
      alert('Please select item(s).');
    }
  }

  viewCart() {
    this.router.navigate(['cart/' + this.purchaseId + '/' + this.route.snapshot.paramMap.get('profileId')]);
  }
}
