import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './pages/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';

@NgModule({
    imports: [ CommonModule, FormsModule, ProfileRoutingModule ],
    declarations: [ ProfileComponent, PurchaseHistoryComponent]
})
export class ProfileModule { }
