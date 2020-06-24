import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from 'src/app/services/modal-services/modal-service';
import { Item } from 'src/app/entities/Item';
import { ItemService } from 'src/app/services/http-service/item.service';
import { ButtonStringConstants } from 'src/app/shared/constants/profile-string-constants';


@Component({
  selector: 'app-inventory-dialogbox',
  templateUrl: './inventory-dialogbox.component.html',
  styleUrls: ['./inventory-dialogbox.component.css']
})
export class InventoryDialogBoxComponent implements OnInit {
  item: Item;

  title: string;

  buttonName: string;

  constructor(private modalService: ModalService,
              private itemService: ItemService) { }

  ngOnInit() {}

  public close() {
    this.modalService.destroy();
  }

  public action(item: Item) {
    if (this.buttonName === ButtonStringConstants.UPDATE) {
      this.itemService.update(item).subscribe(status => {

        if (!status.ok) {
          alert ('Can not update at moment. Please try again.');
        }
      });
    }
    else {
      this.itemService.add(item).subscribe(id => {

        if (id <= 0) {
            alert('Can\'t add item. Please try again.');
        }
      });
    }
  }
}
