import { Component,OnInit} from "@angular/core";
import {SiteService} from '../site.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './catalogue.component.html',
  // styleUrls: ['../../../assets/css/theme-default.css']
})
export class CatalogueComponent implements OnInit{


  categories:any;
  meubles : any;
  meublesChambre:any;
  meublesSalon:any;
  meublesDivers:any;

      constructor(private siteService: SiteService,private router : Router) {

    }

       ngOnInit() {

                this.siteService.getMeubles().subscribe(
            data =>{this.meubles = data;
                    this.meublesChambre=this.meubles.filter(meuble => meuble.categorie.id === 1);
                    this.meublesSalon=this.meubles.filter(meuble => meuble.categorie.id === 2);
                    this.meublesDivers=this.meubles.filter(meuble => meuble.categorie.id === 3)},
            err => {console.log(err)},
            () => {console.log("terminated")}
          );
                          this.siteService.getCategories().subscribe(
            data =>{this.categories = data,console.log(this.categories )},
            err => {console.log(err)},
            () => {console.log("terminated")}
          );

    }



}