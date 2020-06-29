import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PurchaseDetails } from 'src/app/model/PurchaseDetails';
import { ItemService } from 'src/app/services/http-service/item.service';
import { Item } from 'src/app/entities/Item';
import { PurchaseItemService } from 'src/app/services/http-service/purchaseItem.service';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart.item.component.css']
})

export class CartItemComponent implements OnInit {
  private _purchaseDetail: PurchaseDetails;
  stocks = 1;

  @Input() get purchaseDetail() {
    return this._purchaseDetail;
  }
  set purchaseDetail(value: PurchaseDetails) {
    if (value) {
      this._purchaseDetail = value;
    }
  }

  @Output() loadData: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<PurchaseDetails> = new EventEmitter<PurchaseDetails>();

  constructor(private itemService: ItemService,
              private purchaseItemService: PurchaseItemService) {}

  async ngOnInit() {
    await this.itemService.getById(this.purchaseDetail.PurchaseItem.ItemId).then((item: Item) => {
      this.stocks = item.Stocks;
    });
  }

  async remove() {
    this.delete.emit(this.purchaseDetail);
    this.loadData.emit();
  }

  async update(value: any) {
    if (this.stocks + 1 >= value) {
      this.purchaseDetail.PurchaseItem.Quantity = value;
      this.purchaseDetail.PurchaseItem.SubTotal = this.purchaseDetail.PurchaseItem.Price * this.purchaseDetail.PurchaseItem.Quantity;
      this.loadData.emit();
    }
  }
}
