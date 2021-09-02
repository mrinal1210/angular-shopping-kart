import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';

import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.categories$ = this.categoryService.getCategories();

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.productService.getProduct(id)
      .subscribe(product => {
        this.product = product;
      });
  }

  /**
   * save is used to save the product details to the database
   */
  save(data) {
    this.productService.create(data);
    this.router.navigate(['/admin/products']);
  }
}
