import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Purchase } from '../entities/Purchase';

@Injectable()
export class PurchaseService extends BaseService<Purchase> {
  entity = 'Purchase';
}
