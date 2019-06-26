import { Component, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { from } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
     private ngFlashMessageService: NgFlashMessageService,
     private authService: AuthService,
     private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    //Required Fields
    if(!this.validateService.validateRegister(user)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please Fill in all fields"],
        dismissible: true,

        timeout: 3000,

        type: 'danger'
      });
      return false;
    }

    //Validate Email
    if(!this.validateService.validateEmail(user.email)){

      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please use a valid email"],
        dismissible: true,

        timeout: 3000,

        type: 'danger'
      });
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if((data as any).success){
        this.ngFlashMessageService.showFlashMessage({
          messages: ['You are now registered and can log in'],
          dismissible: true,
          timeout: 3000,
          type: 'success'

        });
        this.router.navigate(['/login']);
      }else{
        this.ngFlashMessageService.showFlashMessage({
          messages: [data['msg']],
          dismissible: true,
          timeout: 3000,
          type: 'danger'

        });
        this.router.navigate(['/register']);
      }
    })

  }




}
