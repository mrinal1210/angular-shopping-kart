import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private fireDatabase: AngularFireDatabase
  ) { }

  create(productDetails) {
    return this.fireDatabase.list('/products').push(productDetails);
  }

  getAll() {
    return this.fireDatabase.list('/products').valueChanges();
  }

  getProduct(productId) {
    return this.fireDatabase.object('/products/'+productId).valueChanges();
  }
}
