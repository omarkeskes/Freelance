import { Component,OnInit} from "@angular/core";
import {SiteService} from '../site.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  // styleUrls: ['../../../assets/css/theme-default.css']
})
export class ShowroomComponent implements OnInit {

  usine:any;
  showroomSfax:any;
  ShowroomTunis:any;

  contact :any;

      constructor(private siteService: SiteService,private router : Router) {

    }

    ngOnInit() {

                this.siteService.getShowroomTunis().subscribe(
            data =>{this.ShowroomTunis = data,this.contact = data,console.log(this.ShowroomTunis)},
            err => {console.log(err)},
            () => {console.log("terminated")}
          );
                this.siteService.getShowroomSfax().subscribe(
            data =>{this.showroomSfax = data},
            err => {console.log(err)},
            () => {console.log("terminated")}
          ) ;      
           this.siteService.getInfo().subscribe(
            data =>{this.usine = data},
            err => {console.log(err)},
            () => {console.log("terminated")}
          );

    }

    editContact(cont:any){
      this.contact=cont;
    }


}