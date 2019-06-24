import { Component, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { from } from 'rxjs';

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

  constructor(private validateService: ValidateService, private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateRegister(user)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please Fill in all fields"],
        dismissible: true,

        timeout: 3000,

        type: 'danger'
      });
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){

      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please use a valid email"],
        dismissible: true,

        timeout: 3000,

        type: 'danger'
      });
      return false;
    }

  }


}
