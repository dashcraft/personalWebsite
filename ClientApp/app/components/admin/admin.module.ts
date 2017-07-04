import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AdminComponent } from './admin.component';
import { CounterComponent } from '../counter/counter.component';
import { AdminPostComponent } from '../admin-post/adminPost.component';
import { FormsModule }   from '@angular/forms';
import { BlogService } from '../../services/blog.service';


const newRoutes: Routes = [
            { path: 'admin', component: AdminComponent,
        children:[
            { path: 'dwizzle',component: CounterComponent},
            { path: 'post',component: AdminPostComponent},

            { path: 'post/:id',component: AdminPostComponent}

        ] }
            
        ]

@NgModule({
  providers:[BlogService],
  imports: [
    FormsModule,
    RouterModule.forChild(
      newRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})


export class AdminRoutingModule {}