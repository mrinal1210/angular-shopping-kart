import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../model/app-user';
import { UserService } from './user.service';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private fireAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = fireAuth.authState;
  }

  login() {
    let typedUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('typed-link', typedUrl);

    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    firebase.auth().signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .pipe(switchMap(user => user
        ? this.userService.get(user.uid)
        : of(null)
      )
    );
  }
}
