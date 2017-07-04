import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AdminPostComponent } from '../admin-post/adminPost.component';
import { Http } from '@angular/http';
import {adminPostDisplayComponent} from '../adminPostDisplay/adminPostDisplay.component';
import 'rxjs/Rx';
import { BlogService } from '../../services/blog.service';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})


export class AdminComponent {

    public posts;

    constructor(private http:Http, private blogService: BlogService){
        let x = this.blogService.getAll()
        x.then(x=>this.posts = x);
    }



}