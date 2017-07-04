import { Component,Input, ElementRef,OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';



@Component({
    selector: 'post-display',
    templateUrl: './adminPostDisplay.component.html',
    styleUrls: ['./adminPostDisplay.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class adminPostDisplayComponent{
    public title: String;
    public ShortDescription:String;
    public html:String;
    public meta: String;
    public isPublished :boolean;
    @Input() display;

    constructor(){

    }


}