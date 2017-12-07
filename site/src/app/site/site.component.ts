import { Component } from "@angular/core";
import {Router} from "@angular/router" ;
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

//import * as $ from 'jquery';

@Component({
  moduleId: module.id,
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  templateUrl: './site.component.html',
  // styleUrls: ['../../../assets/css/theme-default.css']
})
export class SiteComponent {
  constructor(private router: Router){

  }
   closeMenu(){
    /*  $("#icon").removeClass('-is-active');
      $("#menu").removeClass('-is-open') ;*/
      document.getElementById('icon').classList.remove('-is-active');
      document.getElementById('menu').classList.remove('-is-open');
      document.getElementById('header').classList.remove('-is-open');
      this.router.navigateByUrl("/");
       }
}