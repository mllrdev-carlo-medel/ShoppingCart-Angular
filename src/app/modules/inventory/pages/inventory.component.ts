import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/http-service/item.service';
import { Item } from 'src/app/entities/Item';
import { ModalService } from 'src/app/services/modal-services/modal-service';
import { InventoryDialogBoxComponent } from '../components/inventory-dialogbox/inventory-dialogbox.component';
import { ButtonStringConstants } from 'src/app/shared/constants/profile-string-constants';

@Component({
  selector: 'app-inventory',
  templateUrl: '../inventory.component.html',
  styleUrls: ['../inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  newItem: Item = new Item();
  searchString: string;
  selectedItem: Item;
  constructor(private itemService: ItemService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemService.getAll().subscribe(items => this.items = this.filteredItems = items);
    this.newItem.Name = null;
    this.newItem.Price = null;
    this.newItem.Stocks = null;
  }

  filter(data: string) {
    if (data) {
      this.filteredItems = this.items.filter((item: Item) => {
          return item.Name.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } else {
        this.filteredItems = this.items;
    }
  }

  openItem(item: Item) {
    this.selectedItem = item;
    const inputs = {
      title: 'Item',
      item: this.selectedItem,
      buttonName: ButtonStringConstants.UPDATE
    };

    this.modalService.init(InventoryDialogBoxComponent, inputs, {});
  }

  addItem() {
    const item = new Item();
    item.Name = '';
    item.Price = null;
    item.Stocks = null;

    const inputs = {
      title: 'Add Item',
      item,
      buttonName: ButtonStringConstants.ADD
    };

    this.modalService.init(InventoryDialogBoxComponent, inputs, {});
  }
}
