import { ActionReducer, Action } from '@ngrx/store';
import { BlogPost} from './blog-post.module';
import * as BlogActions from './actions';


export interface State{
    BlogPosts : BlogPost[];
}

const initialState :State = {
    BlogPosts : []
}

export function blogReducer(state = initialState, action: BlogActions.All): State {
	switch (action.type) {
		case BlogActions.GET_ALL_POSTS:{
			return { ...state,
                BlogPosts: action.payload
            };
        }

		default:
			return state;
    }
        
}