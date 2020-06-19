import { PurchaseItem } from '../entities/PurchaseItem';
import { Item } from '../entities/Item';

export class PurchaseDetails {
  PurchaseItem: PurchaseItem;
  Name: string;

  constructor(purchaseItem: PurchaseItem, item: Item) {
    this.PurchaseItem = purchaseItem;
    this.Name = item.Name;
  }
}
