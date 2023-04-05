import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriesService } from 'src/app/services/categories.service';
@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.css']
})
export class CategoriesTableComponent implements AfterViewInit,OnInit{

constructor(private _category:CategoriesService){}

  ngOnInit(): void {
this.getAllCategories()
  }
  displayedColumns: string[] = ['id','categoryName','action'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCategories(){
   this._category.getCategory().subscribe((res)=>{
    this.dataSource=new MatTableDataSource(res);
    this.dataSource.paginator=this.paginator
        })
  }

  deleteCategory(id:number){
    this._category.deleteCategoryById(id).subscribe((res)=>{
      this.getAllCategories()
    })
  }

  openEditModel(id:number) {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
      this._category.edited=!this._category.edited
      console.log(id)
    } 
  }

}
