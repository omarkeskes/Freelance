import {Http, Response,Headers} from '@angular/http';
import 'rxjs/Rx';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class AdminService {

  constructor(private http: Http) {}

  addUser(user:any){
            var headers = new Headers();
            headers.append('Content-type','Application/json');
            return this.http.post('/api/admin/home/addUser',JSON.stringify(user),{headers:headers})
            .map(
                (response: Response) => {
                    return response.json();
                }
            );

  }

  getUsers(){
            return this.http.get('/api/admin/home/users')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
      
  }

  getInfo() {

            return this.http.get('/api/admin/information')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );

  }

  getShowroomTunis(){
            return this.http.get('/api/admin/information/showroomTunis')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }

getShowroomSfax(){
            return this.http.get('/api/admin/information/showroomSfax')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }

  updateInfo(info :any) {
            var headers = new Headers();
            headers.append('Content-type','Application/json');
            return this.http.put('/api/admin/information',JSON.stringify(info),{headers:headers})
            .map(
                (response: Response) => {
                    return response.json();
                }
            );          
  }

    updateShowroom(showroom :any) {
            var headers = new Headers();
            headers.append('Content-type','Application/json');
            return this.http.put('/api/admin/information/showroom',JSON.stringify(showroom),{headers:headers})
            .map(
                (response: Response) => {
                    return response.json();
                }
            );          
  }

  getMeubles() {
            return this.http.get('/api/admin/galerie')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }
  getMeublesBYCategorie(categorie : any){
      var headers = new Headers();
            headers.append('Content-type','Application/json');
            return this.http.post('/api/admin/galerie/bycategorie',JSON.stringify(categorie),{headers:headers})
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }
  addMeuble(meuble : any){
      var headers = new Headers();
            headers.append('Content-type','Application/json');
            return this.http.post('/api/admin/galerie/meuble',JSON.stringify(meuble),{headers:headers})
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }
    addCategorie(categorie : any){
      var headers = new Headers();
            headers.append('Content-type','Application/json');
            return this.http.post('/api/admin/galerie/categ',JSON.stringify(categorie),{headers:headers})
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }
  updateMeuble(meuble : any ){
      var headers = new Headers();
            headers.append('Content-type','Application/json');
            return this.http.put('/api/admin/galerie/meuble',JSON.stringify(meuble),{headers:headers})
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }
  deleteMeuble(id:any){
            var url= "/api/admin/galerie/meuble/"+id;
            console.log(url);
            return this.http.delete(url)
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }

  getCategories(){
      return this.http.get('/api/admin/categories')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }
  updateCategorie(categorie : any ){
      var headers = new Headers();
            headers.append('Content-type','Application/json');
            return this.http.put('/api/admin/galerie/categorie',JSON.stringify(categorie),{headers:headers})
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }
  deleteCategorie(id:any){
            var url= "/api/admin/galerie/categorie/"+id;
            
            return this.http.delete(url)
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }
  authenticate(user : any ){
        var headers = new Headers();
            headers.append('Content-type','Application/json');
            return this.http.post('/api/admin/authenticate',JSON.stringify(user),{headers:headers})
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
  }
  isAuthenticated(){
      var autheticated = localStorage.getItem("authenticated");
      if(autheticated == 'true'){
          return true ;
      }else {
          return false ;
      }
  }
  getUser(){
      var user =localStorage.getItem("user");   
      return JSON.parse(user);
  }
  logOut(){
      localStorage.removeItem("authenticated");
      localStorage.removeItem("login");
  }
  UploadPhoto(photo:any,type:any){
    var headers = new Headers();
        
            let xhr:XMLHttpRequest = new XMLHttpRequest();
             if(type == "galerie"){
             xhr.open('POST','/api/admin/galerie/addimg/', true);
             }else if (type == "user") {
                xhr.open('POST','/api/admin/galerie/addimguser/', true);
             }
        let formData = new FormData();
        formData.append("file", photo, photo.name);
        xhr.send(formData);
  }
  deleteUser(login:any){
     var url= "/api/admin/user/"+login;
            
            return this.http.delete(url)
            .map(
                (response: Response) => {
                    return response.json();
                }
            ); 
  }


}
