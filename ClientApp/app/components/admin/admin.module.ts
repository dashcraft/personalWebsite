import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AdminComponent } from './admin.component';
import { CounterComponent } from '../counter/counter.component';
import { AdminPostComponent } from '../admin-post/adminPost.component';


const newRoutes: Routes = [
            { path: 'admin', component: AdminComponent,
        children:[
            { path: 'dwizzle',component: CounterComponent},
            { path: 'post',component: AdminPostComponent}
        ] }
            
        ]

@NgModule({
  imports: [
    RouterModule.forChild(
      newRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})


export class AdminRoutingModule {}