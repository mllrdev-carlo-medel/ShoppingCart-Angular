import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../entities/Item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: Item[] = [];

  newItem: Item = new Item();

  selectedItem: Item;
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemService.getAll().subscribe(items => this.items = items);
    this.newItem.Name = null;
    this.newItem.Price = null;
    this.newItem.Stocks = null;
  }

  setSelectedItem(item: Item) {
    this.selectedItem = item;
  }
  update() {
    if (this.selectedItem) {
      this.itemService.update(this.selectedItem).subscribe(ok => {
        if (ok) {
          this.getItems();
        }
        else {
          alert('Can\'t update at the moment\'. Please try again');
        }
      });
    }
    else {
      alert('Please select an item.');
    }
  }

  addItem() {
    this.itemService.add(this.newItem).subscribe(id => {
      if (id > 0) {
        this.getItems();
        alert('Successfully added item with id' + id);
      }
      else {
        alert('Can\'t add item. Please try again');
      }
    });
  }
}
