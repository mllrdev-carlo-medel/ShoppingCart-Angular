import { Customer } from '../entities/Customer';
import { PurchaseHistory } from './PurchaseHistory';

export class CustomerDetails {
  Info: Customer;
  PurchaseHistory: PurchaseHistory[] = [];

  constructor(customer: Customer) {
    this.Info = customer;
  }
}
