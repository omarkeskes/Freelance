import {Component, OnInit,ViewChild} from '@angular/core';
import {AdminService} from '../admin.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {  ShowImageComponent } from './popup.component';
import { ConfirmComponent  } from './confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

//import  '../../../assets/js/plugins/blueimp/jquery.blueimp-gallery.min.js';
declare var  blueimp : any ;

@Component({
  moduleId: module.id,
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.css']
})
export class GalerieComponent implements OnInit {
    categories : any ;
    meubles : any ;
    Allselected : boolean = false ;
    addM : boolean =false;
    addC : boolean=false;
    delC : boolean = false ;
    nameCateg:any;
    elementSelected = [];
    nameM :any;
    descriptionM :any;
    categorieM:any;
    photoM : any;
    nbrpages: any ;
    meublesShow = [];
    pages = [];
    currentpage : any ;
    checked = false ;
    constructor(private adminService: AdminService,private router : Router,private dialogService:DialogService) {

    }
    ngOnInit() {
      this.elementSelected = [];
      if(this.adminService.isAuthenticated()){
          this.adminService.getCategories().subscribe(
            data =>{this.categories = data},
            err => {console.log(err)},
            () => {console.log("terminated")}
          )
          this.adminService.getMeubles().subscribe(
            data =>{this.dividepages(data);this.meubles = this.meublesShow[0];document.getElementById("page1").classList.add('active');},
            err => {console.log(err)},
            () => {console.log("terminated")}
          )
           let element = document.getElementById('slide');
      element.style.display = "block";
      let element2 = document.getElementById('slide2');
      element2.style.display = "block";
      }else {
        this.router.navigate(["/login"]);
      }
      
    }

    addCategorie(){
            var cat= {
              nom :this.nameCateg
            }
      console.log(cat); 
      this.adminService.addCategorie(cat).subscribe(
        data =>{this.categories = data ;},
        err => {console.log(err)},
        () => {});

    }


    onUploadSuccess(event : any){
      console.log("uploaded");
    }
    onUploadError(event:any){
      console.log("error");
    }
    getMeubles(id:any){
      console.log(id);
      var categorie = {
        id : id
      }
       if(this.delC == false){
       this.adminService.getMeublesBYCategorie(categorie).subscribe(
        data => {this.meubles = data;console.log(this.meubles)},
        err => {console.log(err)},
        ()=>{}
      )
       }
    }
    deleteMeubles(id:any){
      let disposable = this.dialogService.addDialog(ConfirmComponent, {
                title:'Supprimer Meuble', 
                message:'Êtes-vous sûr de vouloir supprimer ce meuble ?!'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                        this.adminService.deleteMeuble(id);
                    }
                    else {
                        
                    }
                });
      
    }
    toggleAll(){
      this.Allselected = !this.Allselected;
      $(".gallery-item").each(function(){
            var wr = $(this).find(".iCheck-helper").parent("div");
            console.log(wr.hasClass("checked"));
            if(wr.hasClass("checked")){
                $(this).removeClass("active");
                wr.removeClass("checked");
                wr.find("input").prop("checked",false);
                
            }else{            
                $(this).addClass("active");
                wr.addClass("checked");
                wr.find("input").prop("checked",true);
                
            }
            
        });
    }
        AddM(){
      this.addM=true;
    }
    returnAddM(){
      this.addM=false;
    }
    AddC(){
      this.addC=true;
    }
    returnAddC(){
      this.addC=false;
    }
    fileUpload(fileInput: any){
      this.photoM = fileInput.target.files ;
      console.log(this.photoM);
    }
    addMeuble(){
      let disposable = this.dialogService.addDialog(ConfirmComponent, {
                title:'Ajouter Meuble', 
                message:'Êtes-vous sûr de vouloir ajouter ce meuble ?!'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                       var meuble = {
          nom : this.nameM,
          photo : this.photoM[0].name,
          description : this.descriptionM,
          categorie : this.categorieM        
        }
        console.log(meuble);
        var photo = this.photoM[0];
        this.adminService.addMeuble(meuble).subscribe(
          data => {this.adminService.UploadPhoto(photo,"galerie");
            this.meubles = data ;
        },
          err => {console.log(err);},
          () => {}
        )
                    }
                    else {
                       
                    }
                });      
        
    }
    deleteCategorie(id:any){
      let disposable = this.dialogService.addDialog(ConfirmComponent, {
                title:'Supprimer Categorie', 
                message:'Êtes-vous sûr de vouloir supprimer cette categorie ?!'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                       this.delC = true;

      this.adminService.deleteCategorie(id).subscribe(
        data => {this.delC = false;
        this.categories= data; },
        err => {console.log(err); },
        () => {}
      )
                    }
                    else {
                       
                    }
                });
      console.log(id);
      
    }
    deletemeuble(id:any){
      console.log(id);
      let disposable = this.dialogService.addDialog(ConfirmComponent, {
                title:'Supprimer Meuble', 
                message:'Êtes-vous sûr de vouloir supprimer ce meuble ?!'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                         this.adminService.deleteMeuble(id).subscribe(
                        data => {this.meubles = data},
                        err => {console.log('xx')},
                        () => {console.log('terminated')}
                    );
                    }
                    else {
                       
                    }
                });
     
    }
    deleteAllmeuble(){
      if(this.Allselected == true){
        var i ; 
        let disposable = this.dialogService.addDialog(ConfirmComponent, {
                title:'Supprimer tous les meubles', 
                message:'Êtes-vous sûr de vouloir supprimer tous les meubles ?!'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                        for(i=0;i<this.meubles.length;i++){
          console.log(this.meubles[i].id)
          this.adminService.deleteMeuble(this.meubles[i].id).subscribe(
            data => {console.log('deleted');},
            err => {console.log(err);},
            () => {}
          )
        }
        this.meubles = [];
                    }
                    else {
                        
                    }
                });
        console.log(this.meubles);
        
      }else {
        console.log(this.Allselected)
        let disposable = this.dialogService.addDialog(ConfirmComponent, {
                title:'Confirm title', 
                message:'Confirm message'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                        var i ; 
        for(i=0;i<this.elementSelected.length;i++){
          this.adminService.deleteMeuble(this.elementSelected[i]).subscribe(
            data => {this.meubles = data ;},
            err => {console.log(err);},
            () => {}
          )
        }
        this.elementSelected = [];
                    }
                    else {
                        
                    }
                });
        
      }
    }
    checkmeuble(id:any,event:any){
      console.log(id);
      console.log(event);

      if(event.srcElement.checked){
       
        event.srcElement.parentElement.classList.add("checked");
        event.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("active");
        this.elementSelected.push(id);
      }else {
        this.checked = false ;
        this.Allselected = false ;
        event.srcElement.parentElement.classList.remove("checked");
        event.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove("active");
        var i ;
        for(i=0;i<this.elementSelected.length;i++){
          if (this.elementSelected[i] == id){
            this.elementSelected.splice(i,1);
          }
        }
      }
      console.log(this.elementSelected);
    }
    dividepages(meubles : any){
    console.log(meubles.length);
    console.log(meubles);
    this.nbrpages = Math.ceil(meubles.length /16) ;
    this.pages = Array(this.nbrpages);
    var i = 0 ; 
    for(i=0;i<this.nbrpages;i++){
      this.meublesShow[i] = meubles.splice(0,16);   
    }
    
    console.log(this.nbrpages);
    console.log(this.meublesShow);
  }
  setpages(i:any){
    console.log(i);
    if(i == "next"){
      i = this.currentpage + 1 ;
    }else if (i == "previous") {
      i = this.currentpage - 1;
    }
    console.log(i);
    this.currentpage = i ;
    this.meubles= this.meublesShow[i];
    var j ;
    for(j=0;j<this.nbrpages;j++){
      console.log("page"+(j+1));
      console.log(document.getElementById("page"+(j+1)));
      document.getElementById("page"+(j+1)).classList.remove('active');
    }    
    document.getElementById("page"+(i+1)).classList.add('active');
    if(this.currentpage == 2 ){
      document.getElementById("next").classList.add('disabled');
      document.getElementById("previous").classList.remove('disabled');
    }else if (this.currentpage == 0){
      document.getElementById("next").classList.remove('disabled');
      document.getElementById("previous").classList.add('disabled');
    }else {
      document.getElementById("next").classList.remove('disabled');
      document.getElementById("previous").classList.remove('disabled');
    }
  }
  photo(event:any,id:any){
   //< $("#myModal").show();
   console.log(event);
   if(event.srcElement.id == "check" || event.srcElement.type == "checkbox" || event.srcElement.className == "fa fa-times"){

   }else {
     document.getElementById('pageadmin').classList.add('blureffect');
    let disposable = this.dialogService.addDialog(ShowImageComponent, {
                title:'Confirm title', 
                message:'Confirm message'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                });
            //We can close dialog calling disposable.unsubscribe();
            //If dialog was not closed manually close it by timeout
            
    var i = 0 ;
    for(i=0;i<this.meubles.length;i++){
      if(this.meubles[i].id == id){
        document.getElementById("imgmodal").setAttribute('src','./assets/assets/images/sbb/'+this.meubles[i].photo);
      }
    }
   }
   
  }
  show = false ;
  showcategorie(){
    if(this.show){
      document.getElementById('categorie').style.display = "none";
    }else {
      document.getElementById('categorie').style.display = "block";
    }
  }
    
}
