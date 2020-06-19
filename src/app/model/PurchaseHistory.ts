import { Purchase } from '../entities/Purchase';
import { PurchaseDetails } from './PurchaseDetails';

export class PurchaseHistory{
  Purchase: Purchase;
  PurchaseDetails: PurchaseDetails[] = [];

  constructor(purchase: Purchase) {
    this.Purchase = purchase;
  }

}
