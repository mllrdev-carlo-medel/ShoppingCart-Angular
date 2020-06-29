import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { ItemsDialogBoxComponent } from './components/purchase-history/items-dialogbox/items-dialogbox.component';
import { ItemsDialogBoxModule } from './components/purchase-history/items-dialogbox/items-dialogbox.module';

@NgModule({
    imports: [ CommonModule, FormsModule, ProfileRoutingModule, ItemsDialogBoxModule ],
    declarations: [ ProfileComponent, PurchaseHistoryComponent ],
    entryComponents: [ ItemsDialogBoxComponent ]
})

export class ProfileModule { }
