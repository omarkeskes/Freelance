import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {Router} from '@angular/router';
import { ConfirmComponent  } from '../galerie/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  moduleId: module.id,
  templateUrl: './dash.component.html',
  // styleUrls: ['../../../assets/css/theme-default.css']
})
export class DashComponent implements OnInit {

  users :any;
  user:any;
  currentUser : any ;
  edit:boolean=false;
  add:boolean=false;

  loginU:any;
  passU:any;
  nomU:any;
  prenomU:any;
  telU:any;
  adresseU:any;
  mailU:any;
  photoU:any = [];
  adminU:any;

  
  nom:any;
  prenom:any;
  tel:any;
  adresse:any;
  mail:any;
  photo:any;
  admin:any;
  password:any;


    constructor(private adminService: AdminService,private router:Router,private dialogService:DialogService) {

    }
    ngOnInit() {
      if(!this.adminService.isAuthenticated()){

        this.router.navigate(["/login"]);
      }else {
        let element = document.getElementById('slide');
        element.style.display = "block";
        let element2 = document.getElementById('slide2');
        element2.style.display = "block";
        this.currentUser = this.adminService.getUser();
        this.adminService.getUsers().subscribe(
          data =>{this.users = data ;this.user=this.currentUser; console.log(this.users);},
          err =>{console.log(err);},
          () => {console.log("terminated")}
        );
        console.log(this.user.login);
      }
    }
    fileUpload(fileInput: any){
      this.photoU = fileInput.target.files ;
      console.log(this.photoU);
    }

    addUser(){
      if(this.currentUser.admin){
       let disposable = this.dialogService.addDialog(ConfirmComponent, {
                title:'Ajouter Member', 
                message:'Êtes-vous sûr de vouloir ajouter ce membre ?!'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                        var user={
        login:this.loginU,
        password:this.passU,
        nom:this.nomU,
        prenom:this.prenomU,
        adresse:this.adresseU,
        tel:this.telU,
        mail:this.mailU,
        photo:this.photoU[0].name,
        admin:this.adminU,

      }
      console.log(user);
      var photo = this.photoU[0];
      this.adminService.addUser(user).subscribe(
          data => {this.adminService.UploadPhoto(photo,"user");
            this.users = data ;
            this.photoU= [];
        },
          err => {console.log(err);},
          () => {}
        )
                    }
                    else {
                        
                    }
                });
      }else {
        alert("Vous n'avez pas le droit");
      }
    }



    buttonAdd(){
      this.add=true;
    }
        buttonCancel(){
      this.add=false;
    }

    getProfil(login:any){

      for(let us of this.users) {
        if(us.login==login)
          this.user = us;
      }
    }

    buttonCancelProfil(){
      document.getElementById('editprofil').style.display = "none";
      document.getElementById('dataprofil').style.display = "block";

    }
    buttonEditProfil(){  
      document.getElementById('editprofil').style.display = "block";
      document.getElementById('dataprofil').style.display = "none";
      //this.edit=true;
    }

    editUser(){

      if(this.currentUser.admin || this.currentUser.login == this.user.login){
      let disposable = this.dialogService.addDialog(ConfirmComponent, {
                title:'Modifier User', 
                message:'Êtes-vous sûr de vouloir modifier ces informations ?!'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                        var user = {
        login : this.user.login, 
        password:this.password,
        nom:this.nom,
        prenom:this.prenom,
        adresse:this.adresse,
        tel:this.tel,
        mail:this.mail,
        photo:"",
        admin:this.admin,
      }
      if(!user.password){
        user.password = this.user.password;
      }
      if(!user.nom){
        user.nom = this.user.nom
      }
      if(!user.prenom){
        user.prenom = this.user.prenom
      }
      if(!user.adresse){
        user.adresse = this.user.adresse
      }
      if(!user.photo){
        user.photo = this.user.photo
      }
      if(!user.mail){
        user.mail = this.user.mail
      }
      
      if(!user.admin || !this.currentUser.admin){
        user.admin = this.user.admin;
      }
      if(!user.tel){
        user.tel = this.user.tel ;
      }
      if(this.photoU.length > 0){
        user.photo = this.photoU[0].name ;
      }else {
        user.photo = this.user.photo;
      }
      console.log(user);  
      var photo = this.photoU[0];
      this.adminService.addUser(user).subscribe(
          data => {
            if(this.photoU.length > 0){this.adminService.UploadPhoto(photo,"user");}
            this.users = data ; 
            this.getProfil(this.user.login);  
            this.photoU= [];
        },
          err => {console.log(err);},
          () => {}
        )
                    }
                    else {
                        
                    }
                });
    }else {
      alert("Vous n'avez pas le droit");
    }
  }
  deleteUser(login:any){
    if(this.currentUser.admin){
      let disposable = this.dialogService.addDialog(ConfirmComponent, {
                title:'Suprimer User', 
                message:'Êtes-vous sûr de vouloir supprimer ce membre ?!'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                        this.adminService.deleteUser(login).subscribe(
                        data => {
                          this.users = data ;
                          this.user = this.currentUser;
                        },
                        err => {
                          console.log(err);
                        },
                        () => {

                        }
                        );
                    }
                    else {
                        
                    }
                });
    }else {
      alert("Vous n'avez pas le droit");
    }
  }

}
