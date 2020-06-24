import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './pages/items.component';

const routes: Routes = [
    { path: 'items/:puchaseId/:profileId', component: ItemsComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class ItemsRoutingModule {

}
