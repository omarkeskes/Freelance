import { Component, OnInit, HostListener } from '@angular/core';
import {AdminService} from './admin.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
@Component({
  moduleId: module.id,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  // styleUrls: ['../../../assets/css/theme-default.css']
})
export class AdminComponent implements OnInit {

  user:any;
  currentUser :any ;
    constructor(private adminService: AdminService,private router : Router) {
      if(!this.adminService.isAuthenticated()){
        console.log("qq");
        
        //$("#slide").css('display','none');
        
      }
    }

    ngOnInit() {
      setInterval(()=>{
        
          this.user = this.adminService.getUser();
        
       
      },300);
        

    }
    getUser(){
      this.user = this.adminService.getUser();
    }
    logout(){
      if(this.adminService.isAuthenticated()){
        this.adminService.logOut();
        this.user = null ;
        this.router.navigate(["/login"]);
      }
    }
    @HostListener('window:unload', ['$event'])
    unloadHandler(event) {
        this.adminService.logOut();
    }
}
