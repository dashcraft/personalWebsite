import { Component, Input, ElementRef,OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router,Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { BlogService  } from '../../services/blog.service';

@Component({
    selector: 'blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
})
export class BlogComponent {
    constructor(private http: Http,private router: Router,private route: ActivatedRoute,private blogService: BlogService){
        

    }
    OnInit(){
    }


}