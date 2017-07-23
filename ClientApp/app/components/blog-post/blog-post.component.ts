import { Component, Input, ElementRef,OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router,Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Http, RequestOptions, URLSearchParams } from '@angular/http';


import { FormsModule }   from '@angular/forms';
import { BlogService  } from '../../services/blog.service';



@Component({
    selector: 'blog-post',
    templateUrl: './blog-post.component.html',
    styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit{
    sub: any;
    index:any;
    post:any;
    next:boolean;
    previous:boolean;
    constructor(private http: Http,private router: Router,private route: ActivatedRoute,private blogService: BlogService){
        

    }
    ngOnInit(){
        if(this.route.params){
            this.sub = this.route.params.subscribe(params => {
                this.index = params['id'];
                if(this.index){
                    let data: URLSearchParams = new URLSearchParams();
                    data.set('rss_url','https://medium.com/feed/@D_ofashandfire');
                    let options = new RequestOptions();
                    options.search = data;
        this.http.get('https://api.rss2json.com/v1/api.json',options).toPromise().then(
            x=>{
                let items = x.json().items;
                let next = parseInt(this.index)+1;
                if(items[next]){
                   this.next = true; 
                }
                else{
                    this.next=false;
                }

                if(items[next-2]){
                    this.previous = true;
                }
                else{
                    this.previous = false;
                }
                this.post = items[this.index];
                
                console.log(this.post);
                console.log(next);
            }
        )
                }
                
            });
        }
        else{
            this.router.navigate(['/blog']);
        }

    }


}