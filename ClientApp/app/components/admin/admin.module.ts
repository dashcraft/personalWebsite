import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AdminComponent } from './admin.component';
import { CounterComponent } from '../counter/counter.component';


const newRoutes: Routes = [
            { path: 'admin', component: AdminComponent },
            { path: 'admin/counter', component: CounterComponent}
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