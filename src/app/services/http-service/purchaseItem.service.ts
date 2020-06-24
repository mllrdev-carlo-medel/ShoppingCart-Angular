import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { PurchaseItem } from '../../entities/PurchaseItem';

@Injectable()
export class PurchaseItemService extends BaseService<PurchaseItem> {
  entity = 'PurchaseItem';
}
