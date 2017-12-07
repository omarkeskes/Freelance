import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DropzoneModule } from 'angular2-dropzone-wrapper';
import { DropzoneConfigInterface } from 'angular2-dropzone-wrapper';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import {AdminService} from './admin/admin.service';
import { InformationComponent } from './admin/information/information.component';
import { GalerieComponent } from './admin/galerie/galerie.component';
import {  ShowImageComponent } from './admin/galerie/popup.component';
import {  ConfirmComponent } from './admin/galerie/confirm.component';
import { LoginComponent } from './admin/login/login.component';
import { DashComponent } from './admin/dashboard/dash.component';
import { RouterModule } from '@angular/router';
//import {PopupModule} from 'ng2-opd-popup';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

const DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address: 
  server: '/api/admin/galerie/addimg',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    InformationComponent,
   GalerieComponent,
    DashComponent,
    LoginComponent,
    ConfirmComponent,
    ShowImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BootstrapModalModule.forRoot({container:document.body}),
    HttpModule,
    DropzoneModule.forRoot(DROPZONE_CONFIG),
    RouterModule.forRoot([
          { path: '', component: DashComponent },
          { path: 'login', component: LoginComponent },
          { path: 'information', component: InformationComponent },
           { path: 'galerie', component: GalerieComponent}
    ]),
        
  ],
  entryComponents: [
        ConfirmComponent,
        ShowImageComponent
      ],
  providers: [AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
