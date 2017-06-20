import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    isExpanded : Boolean = false;

    OnInit(){
    }

    toggleExpanded(){
        console.log('this is currently working',this.isExpanded);
        if(this.isExpanded){
            this.isExpanded = false;
        }
        else{
            this.isExpanded = true;
        }

    }



}
