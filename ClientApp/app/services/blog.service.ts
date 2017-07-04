import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import "rxjs/add/operator/toPromise";


@Injectable()
export class BlogService {


    constructor(
        private http: Http
    ) { }

    getAll(): Promise<any> {
        return this.http.get("/api/blog").toPromise()
            .then(response => {
                let result = response.json();
                if (result.State == 1) {
                    let json = result.Data as any;

                }
                return result;
            })
            .catch(this.handleError);
    }

    getPost(id:number): Promise<any> {
        return this.http.get("/api/blog/"+id).toPromise()
        .then(response => {
                let result = response.json();
                if (result.State == 1) {
                    let json = result.Data as any;
                }
                return result;
            })
        .catch(this.handleError);
    }

    getUrlSlug(slug:number): Promise<any> {
        return this.http.get("/api/blog/slug/"+slug).toPromise()
        .then(response => {
                let result = response.json();
                if (result.State == 1) {
                    let json = result.Data as any;
                }
                return result;
            })
        .catch(this.handleError);
    }

    logout() { }

    

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}