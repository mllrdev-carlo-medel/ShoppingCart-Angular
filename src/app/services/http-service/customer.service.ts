import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Customer } from '../../entities/Customer';

@Injectable()
export class CustomerService extends BaseService<Customer> {
  entity = 'Customer';
}
