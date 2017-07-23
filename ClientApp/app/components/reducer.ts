import * as blogReducer from './blog.reducer';

export interface State{
    blog : blogReducer.State;
}


export const rootReducer = {
    blog: blogReducer.blogReducer
}