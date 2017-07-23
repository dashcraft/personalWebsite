import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Http, RequestOptions, URLSearchParams } from "@angular/http";
import { BlogService } from "../../services/blog.service";


import { BlogPost } from '../blog-post.module';
import { Store } from '@ngrx/store';
import * as BlogActions from '../actions';
import * as fromRoot from '../reducer';
import { Observable } from "rxjs/Observable";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styles:['./home.component.css']
})
export class HomeComponent implements OnInit{
    posts:any;
    res:any;
    BlogPosts : Observable<BlogPost[]>;


    constructor(private http: Http, private store: Store<fromRoot.State>, private router: Router,private route: ActivatedRoute,private blogService: BlogService){
    
        this.BlogPosts = store.select(state => state.blog.BlogPosts);
    }

    ngOnInit(){
        let data: URLSearchParams = new URLSearchParams();
        data.set('rss_url','https://medium.com/feed/@D_ofashandfire');
        let options = new RequestOptions();
        options.search = data;
        this.http.get('https://api.rss2json.com/v1/api.json',options).subscribe(
            x=>{
                let items = x.json().items;
                this.res = x.json();
                console.log(this.res);
                
                this.posts = items;
                this.posts = this.posts.map(
                    item=>{
                        let tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
                        let srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
                        let srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                        let srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
                        let src = item.description.substring(srcStart, srcEnd);
                        item.thumbnail = src;

                        var yourString = item.description.replace(/<img[^>]*>/g,"");

                        let maxLength = 120 // maximum number of characters to extract

                        //trim the string to the maximum length

                        let trimmedString = yourString.substr(0, maxLength);

                        //re-trim if we are in the middle of a word

                        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                        
                        item.description = trimmedString;


                        return item;
                    }


                )                    
                this.store.dispatch(new BlogActions.getAllPosts(this.posts))
                console.log(this.posts);
            }
        )

    }

}

