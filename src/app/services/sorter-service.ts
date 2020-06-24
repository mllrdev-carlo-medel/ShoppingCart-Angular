import { Injectable } from '@angular/core';

@Injectable()
export class SorterService {

  property: string = null;

    sort(collection: any[], prop: any) {

        collection.sort((a: any, b: any) => {
            const aVal = a[prop];
            const bVal = b[prop];

            if (aVal === bVal){
                return 0;
            }
            else if (aVal > bVal){
                return -1;
            }
            else {
                return 1;
            }
        });
    }

    isString(val: any): boolean {
      return (val && (typeof val === 'string' || val instanceof String));
    }
}
