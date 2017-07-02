import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { BrowserModule } from '@angular/platform-browser';
import {MainRoutingModule} from './components/app/app.module';
import { AdminComponent } from './components/admin/admin.component';
import { AdminRoutingModule } from './components/admin/admin.module';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        HomeComponent,
        CounterComponent,
        HomeComponent,
        NavMenuComponent,
        FetchDataComponent,
        AdminComponent
    ],
    imports: [
        UniversalModule,
        AdminRoutingModule,
        MainRoutingModule // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
    ]
})
export class AppModule {
}
