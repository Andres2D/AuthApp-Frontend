import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, 
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  Login(){

    if(this.loginForm.valid){

      const { email, password } = this.loginForm.value;  

      this.authService.Login(email, password)
        .subscribe( ok => {
          if(ok === true){
            this.router.navigateByUrl('/dashboard');
          }else{
            //TODO error msg
            Swal.fire('Error', ok, 'error');
          }
        });
    }
  }
}
