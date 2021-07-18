import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {}  

  canActivate(){
    return this.authService.ValidateToken()
      .pipe(
        tap( valid => {
          if(!valid){
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }

  canLoad() {
    return this.authService.ValidateToken()
    .pipe(
      tap( valid => {
        if(!valid){
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }
}
