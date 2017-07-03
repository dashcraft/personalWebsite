import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-nav',
    templateUrl: './adminNav.component.html',
    styleUrls: ['./adminNav.component.css'],
    host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class AdminNavComponent {

    onResize(event){
    }


}