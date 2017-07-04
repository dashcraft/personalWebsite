import { Component, Input, ElementRef,OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { Headers, Http } from "@angular/http";
import { Router,Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Post } from './postModel';
import { FormsModule }   from '@angular/forms';
import { BlogService  } from '../../services/blog.service';

import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import * as Quill from 'quill';

@Component({
    selector: 'adminPost',
    templateUrl: './adminPost.component.html',
    styleUrls: ['./adminPost.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AdminPostComponent{ 
    public html: String;
    public title: String;
    public id : number;
    public shortDescription: String;
    public meta : String;
    public isPublished: boolean;
    private sub: any;
    @ViewChild('editor') editor : QuillEditorComponent;
    @Input() editPost;


    constructor(private http: Http,private router: Router,private route: ActivatedRoute,private blogService: BlogService){

    }

    ngOnInit(){
        if(this.route.params){
            this.sub = this.route.params.subscribe(params => {
                this.id = +params['id'];
                if(this.id){
                    let data = this.blogService.getPost(this.id);
                    data.then(x=>
                        {
                            console.log(x);
                            this.title =x.title;
                            this.shortDescription = x.shortDescription;
                            this.meta = x.meta;
                            this.isPublished = x.isPublished;
                            this.editor.writeValue(x.description);
                        }
                    )
                }
                
            });
        }



        this.editor
      .onContentChanged.debounceTime(400)
      .distinctUntilChanged()
      .subscribe(data => {
          this.html = data.html;
        console.log('view child + directly subscription', data)
        });
    }

    
    submitPost() {
        let data = {
            title:this.title,
            ShortDescription: this.shortDescription,
            Description: this.html,
            meta: this.meta,
            published:true,
        }
        this.http.post("/api/Blog", data).toPromise().then(response => {
                let result = response.json();
                console.log(result);
                this.router.navigate(['/admin']);
            })
            .catch(this.handleError);
    }

    updatePost() {
        let data = {
            title:this.title,
            ShortDescription: this.shortDescription,
            Description: this.html,
            meta: this.meta,
            published:true,
        }
        this.http.put("/api/Blog/"+this.id, data).toPromise().then(response => {
                let result = response.json();
                console.log(result);
                let json = result.Data;
                if(result.success){
                    this.router.navigate(['/admin']);
                }
                
                
            })
            .catch(this.handleError);
    }

    deletePost() {
        
        this.http.delete("/api/Blog/"+this.id).toPromise().then(response => {
                let result = response.json();
                console.log(result);
                if (result.success) {
                    this.router.navigate(['/admin']);
                }
                else{
                    this.handleError(new Error("There was an error"));
                }
                
            })
            .catch(this.handleError);
    }

      private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}