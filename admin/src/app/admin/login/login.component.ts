import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    login : any ;
    password : any ;

    constructor(private adminService: AdminService,private router : Router) {

    }
    ngOnInit() {
      let elementdiv = document.getElementById('slidediv');
      elementdiv.classList.remove('page-content');
      elementdiv.classList.add('login-container');
      elementdiv.style.height="100%";
      let element = document.getElementById('slide');
      element.style.display = "none";
      let element2 = document.getElementById('slide2');
      element2.style.display = "none";
      
      }

    authenitcate(){
      var user = {
        login: this.login,
        password : this.password
      }
      console.log(user);
      this.adminService.authenticate(user).subscribe(
        data => {console.log(data);
          localStorage.setItem("authenticated",'true');
          localStorage.setItem("login",data.login); 
          localStorage.setItem("user",JSON.stringify(data));
          this.router.navigate(["/"]); 
        },
        err => {console.log(err)},
        ()=>{console.log("terminated")}
      )

    }

}
