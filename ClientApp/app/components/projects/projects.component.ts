import { Component, Input, ElementRef,OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router,Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { FormsModule }   from '@angular/forms';

@Component({
    selector: 'projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css'],
})



export class ProjectsComponent {
    constructor(private http: Http,private router: Router,private route: ActivatedRoute){
        

    }
    OnInit(){
    }


}