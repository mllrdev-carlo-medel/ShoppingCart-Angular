import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Item } from '../entities/Item';

@Injectable()
export class ItemService extends BaseService<Item> {
  entity = 'Item';
}
