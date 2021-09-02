import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private fireDatabase: AngularFireDatabase
  ) { }

  /**
   * getCategories() is used to fetch the list of categories for the drop-down menu from databse.
   */
  getCategories() {
    return this.fireDatabase.list('/categories', ref =>
      ref.orderByChild('name')
    ).valueChanges();
  }
}
