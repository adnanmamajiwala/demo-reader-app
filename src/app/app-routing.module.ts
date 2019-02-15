import {NgModule} from '@angular/core';
import {NativeScriptRouterModule} from 'nativescript-angular/router';
import {Routes} from '@angular/router';

import {ItemsComponent} from './item/items.component';
import {ItemDetailComponent} from './item/item-detail.component';
import {ReaderComponent} from '~/app/reader/reader.component';

const routes: Routes = [
    {path: '', redirectTo: '/reader', pathMatch: 'full'},
    {path: 'reader', component: ReaderComponent},
    {path: 'items', component: ItemsComponent},
    {path: 'item/:id', component: ItemDetailComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
