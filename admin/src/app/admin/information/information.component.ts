import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import { Router } from '@angular/router'
import { ConfirmComponent } from "app/admin/galerie/confirm.component";
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  moduleId: module.id,
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
   

     Information : any ;
     adresse : any ;
     tel : any ;
     fax:any;
     mail : any ;
     facebook : any ;
     description : any ;

     ShowroomTunis : any;
    adresseT : any ;
     telT : any ;
     mobileT:any;
     mailT : any ;

     ShowroomSfax : any;
      adresseS : any ;
     telS : any ;
     mobileS:any;
     mailS : any ;
     user : any ;

     
    constructor(private adminService: AdminService, private router : Router,private dialogService:DialogService) {

    }

    ngOnInit() {
      if(this.adminService.isAuthenticated()){
        this.user = this.adminService.getUser();
        this.Information = this.adminService.getInfo().subscribe(
          data =>{this.Information = data ; console.log(this.Information);},
          err =>{console.log(err);},
          () => {console.log("terminated")}
        );
        this.ShowroomTunis = this.adminService.getShowroomTunis().subscribe(
          data =>{this.ShowroomTunis = data ; console.log(this.ShowroomTunis);},
          err =>{console.log(err);},
          () => {console.log("terminated")}
        );
        this.ShowroomSfax = this.adminService.getShowroomSfax().subscribe(
          data =>{this.ShowroomSfax = data ; console.log(this.ShowroomSfax);},
          err =>{console.log(err);},
          () => {console.log("terminated")}
        );
        let element = document.getElementById('slide');
      element.style.display = "block";
      let element2 = document.getElementById('slide2');
      element2.style.display = "block";
      }else {
        this.router.navigate(["/login"]);
      }
    }

    UpdateInfo(){
      var info = {
        id : 1,
        adresse : this.adresse,
        tel : this.tel,
        fax : this.fax,
        mail : this.mail,
        facebook : this.facebook,
        description: this.description

      }
        var showroomT = {
        id : 1,
        nom : this.ShowroomTunis.nom,
        //nom : 'Showroom Tunis',
        adresse : this.adresseT,
        tel : this.telT,
        mobile : this.mobileT,
        mail : this.mailT,
        map : this.ShowroomTunis.map,
        photo :this.ShowroomTunis.photo,
      }
        var showroomS = {
        id : 2,
        nom : this.ShowroomSfax.nom,
        //nom : 'Showroom Sfax',
        adresse : this.adresseS,
        tel : this.telS,
        mobile : this.mobileS,
        mail : this.mailS,
         map : this.ShowroomSfax.map,
        photo :this.ShowroomSfax.photo,
      }
      if(!info.adresse){
        info.adresse = this.Information.adresse ;
      }
      if(!info.tel){
        info.tel = this.Information.tel ;
      }
      if(!info.fax){
        info.fax = this.Information.fax;
      }
      if(!info.mail){
        info.mail = this.Information.mail ;
      }
      if(!info.facebook){
        info.facebook = this.Information.facebook ;
      }
      if(!info.description){
        info.description = this.Information.description ;
      }
      if(!showroomT.adresse){
        showroomT.adresse = this.ShowroomTunis.adresse ;
      }
      if(!showroomT.tel){
        showroomT.tel = this.ShowroomTunis.tel ;
      }
      if(!showroomT.mobile){
        showroomT.mobile = this.ShowroomTunis.mobile;
      }
      if(!showroomT.mail){
        showroomT.mail = this.ShowroomTunis.mail ;
      }
            if(!showroomS.adresse){
        showroomS.adresse = this.ShowroomSfax.adresse ;
      }
      if(!showroomS.tel){
        showroomS.tel = this.ShowroomSfax.tel ;
      }
      if(!showroomS.mobile){
        showroomS.mobile = this.ShowroomSfax.mobile;
      }
      if(!showroomS.mail){
        showroomS.mail = this.ShowroomSfax.mail ;
      }
      if(this.user.admin){
      let disposable = this.dialogService.addDialog(ConfirmComponent, {
                title:'Modifier Informations', 
                message:'Êtes-vous sûr de vouloir modifier ces informations ?!'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                     this.adminService.updateInfo(info).subscribe(
        data =>{console.log(data);this.Information = data;},
        err => {console.log(err)},
        () => {});
        this.adminService.updateShowroom(showroomT).subscribe(
        data =>{console.log(data);this.ShowroomTunis = data;},
        err => {console.log(err)},
        () => {});
        this.adminService.updateShowroom(showroomS).subscribe(
        data =>{console.log(data);this.ShowroomSfax = data;},
        err => {console.log(err)},
        () => {});
                    }
                    else {
                        
                    }
                }); }else {
                  alert("Vous n'avez pas le droit");
                }
      
    }
}
