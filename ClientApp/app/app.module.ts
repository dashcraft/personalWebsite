import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { UniversalModule } from 'angular2-universal';
import { FormsModule }   from '@angular/forms';
import { StoreModule } from "@ngrx/store";
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { BrowserModule } from '@angular/platform-browser';
import {MainRoutingModule} from './components/app/app.module';
import { AdminComponent } from './components/admin/admin.component';
import { AdminRoutingModule } from './components/admin/admin.module';
import { AdminNavComponent } from './components/admin-navbar/adminNav.component';
import { AdminPostComponent } from './components/admin-post/adminPost.component';
import { QuillModule } from 'ngx-quill';
import { adminPostDisplayComponent } from './components/adminPostDisplay/adminPostDisplay.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { rootReducer } from './components/reducer';





@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        HomeComponent,
        CounterComponent,
        HomeComponent,
        BlogPostComponent,
        NavMenuComponent,
        adminPostDisplayComponent,
        FetchDataComponent,
        AdminNavComponent,
        AdminPostComponent,
        BlogComponent,
        AdminComponent
    ],
    imports: [
        UniversalModule,
        FormsModule,
        StoreModule.provideStore(rootReducer),
        // Note that you must instrument after importing StoreModule
        StoreDevtoolsModule.instrumentStore({
            maxAge: 5
        }),
        QuillModule,
        AdminRoutingModule,
        MainRoutingModule // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
    ]
})
export class AppModule {
}
