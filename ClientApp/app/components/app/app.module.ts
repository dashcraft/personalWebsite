import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component'
import { NavMenuComponent } from '../navmenu/navmenu.component';
import { HomeComponent } from '../home/home.component';
import { FetchDataComponent } from '../fetchdata/fetchdata.component';
import { CounterComponent } from '../counter/counter.component';
import { BlogComponent } from '../blog/blog.component';
import { BlogService  } from '../../services/blog.service';
import { BlogPostComponent } from '../blog-post/blog-post.component';

const appRoutes: Routes = [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent, pathMatch: 'full' },
            { path: 'blog', component: BlogComponent},
            { path: 'blog/:id', component: BlogPostComponent, pathMatch: 'full' },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers:[
      BlogService
    ],

  exports: [
    RouterModule
  ]
})
export class MainRoutingModule {}



