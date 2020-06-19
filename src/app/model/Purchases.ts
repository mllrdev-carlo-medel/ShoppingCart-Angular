import { Purchase } from '../entities/Purchase';

export class Purchases {
  Name: string = null;
  Purchase: Purchase = null;

  constructor(name: string, purchase: Purchase) {
    this.Name = name;
    this.Purchase = purchase;
  }
}
