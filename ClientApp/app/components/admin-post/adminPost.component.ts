import { Component, ElementRef,OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime'
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
    
    constructor(){

    }


   consoleAllTheThings(event){
       this.html = event.text;
    console.log('changes where made', event)
   }

    checkThis(){
        console.log(this.html);
    }


}