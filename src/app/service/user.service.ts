import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject  } from '@angular/fire/database';

import firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppUser } from '../model/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private fireDatabase: AngularFireDatabase
  ) { }

  /**
   * save(user) is used to save the name, email & check for update in the name and email field later
   */
  save(user: firebase.User) {
    this.fireDatabase.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  /**
   * get(uid: string): AngularFireObject<AppUser> is used to read a user
   */
  get(uid: string): Observable<any> {
    return this.fireDatabase.object('/users/' + uid).valueChanges();
  }
}
