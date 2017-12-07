import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog">
                     <button type="button" class="icon-close pull-right close" (click)="closePopup()" ><i class="fa fa-times" aria-hidden="true"></i></button> 
                   <div class="modal-body">
                    
                     <img  id="imgmodal" class="img-responsive img-modal">
                   </div>
                 
              </div>`,
              styleUrls: ['./galerie.component.css']
})
export class ShowImageComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
  closePopup(){
    document.getElementById('pageadmin').classList.remove('blureffect');
    this.close();
  }
}