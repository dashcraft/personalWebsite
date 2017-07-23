import {Injectable} from '@angular/core';
import { Action } from '@ngrx/store';
import { BlogPost } from './blog-post.module';

export const GET_ALL_POSTS = '[Post] Load Posts';

export class getAllPosts implements Action{
    readonly type = GET_ALL_POSTS;

    constructor(public payload: BlogPost[]){
        
    }
    
}

export type All = getAllPosts;