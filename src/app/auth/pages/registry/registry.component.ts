import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  signupForm: FormGroup = this.fb.group({
    name: ['test6', [Validators.required]],
    email: ['test6@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  SignUp(){
    if(this.signupForm.valid){

      const { name, email, password } = this.signupForm.value;  

      this.authService.Signup(name, email, password)
        .subscribe( ok => {
          console.log(ok);
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
