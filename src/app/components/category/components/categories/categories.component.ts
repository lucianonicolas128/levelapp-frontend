import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public company!: string;
  public categories: Category[] = [];
  public categoriesFiltered: Category[] = [];
  public isConfirm: boolean;
  public category: Category;

  constructor(
    private _categoryService: CategoryService,
  ) {
    this.company = localStorage.getItem('TOKEN');
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      res => {
        if (res.categories) this.categories = res.categories;
      }
    )
  }
  
  addCategory(){
    
  }

}
