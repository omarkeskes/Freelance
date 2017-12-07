import {Http, Response,Headers} from '@angular/http';
import 'rxjs/Rx';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class SiteService{

    constructor(private http: Http) {}

      getInfo() {

            return this.http.get('/api/information')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );

  }

  getShowroomTunis(){
            return this.http.get('/api/information/showroomTunis')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }

getShowroomSfax(){
            return this.http.get('/api/information/showroomSfax')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }

  getMeubles() {
            return this.http.get('/api/galerie')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }

  getCategories(){
      return this.http.get('/api/categories')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }

}