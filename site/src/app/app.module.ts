import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {SiteComponent}from'./site/site.component';
import {CatalogueComponent}from'./site/catalogue/catalogue.component';
import {ShowroomComponent}from'./site/showroom/showroom.component';
import {GalerieComponent}from'./site/galerie/galerie.component';
import { RouterModule } from '@angular/router';
import {SiteService} from './site/site.service';
@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    ShowroomComponent,
    GalerieComponent,
    CatalogueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
       RouterModule.forRoot([
          { path: '', component: SiteComponent },
          { path: 'catalogue', component: CatalogueComponent }
    ]),
  ],
  providers: [SiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
