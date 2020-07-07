import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal-services/modal-service';
import { PurchaseDetails } from 'src/app/model/PurchaseDetails';

@Component({
  selector: 'app-items-dialogbox',
  templateUrl: './items-dialogbox.component.html',
  styleUrls: ['./items-dialogbox.component.css']
})

export class ItemsDialogBoxComponent implements OnInit {
  purchaseDetails: PurchaseDetails[] = [];
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  public close() {
    this.modalService.destroy();
  }
}
