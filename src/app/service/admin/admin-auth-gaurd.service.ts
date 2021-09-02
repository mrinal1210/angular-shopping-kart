import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';

import { map } from 'rxjs/operators';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.appUser$
      .pipe(map(appUser => appUser.isAdmin));
  }
}
