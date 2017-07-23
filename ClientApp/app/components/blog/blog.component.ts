import { Component, Input, ElementRef,OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router,Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, URLSearchParams} from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { BlogService  } from '../../services/blog.service';

@Component({
    selector: 'blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit{
    posts:any;
    res:any;
    constructor(private http: Http,private router: Router,private route: ActivatedRoute,private blogService: BlogService){
    }

    ngOnInit(){
        let data: URLSearchParams = new URLSearchParams();
        data.set('rss_url','https://medium.com/feed/@D_ofashandfire');
        let options = new RequestOptions();
        options.search = data;
        this.http.get('https://api.rss2json.com/v1/api.json',options).toPromise().then(
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
                console.log(this.posts);
            }
        )

    }


}
