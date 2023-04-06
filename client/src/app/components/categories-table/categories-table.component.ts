import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/dataTypes/typesModule';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoriesPopupComponent } from '../categories-popup/categories-popup.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.css']
})
export class CategoriesTableComponent implements AfterViewInit,OnInit{

constructor(private _category:CategoriesService, private _dialog:MatDialog){}


ngOnInit(): void {
this.getAllCategories()
  }

  openDialog(){
    const dialogRef= this._dialog.open(CategoriesPopupComponent);
    dialogRef.afterClosed().subscribe((res:any)=>{
     if(res){
       this.getAllCategories();
     }
    })
   }

  displayedColumns: string[] = ['id','categoryName','action'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCategories(){
   this._category.getCategory().subscribe((res:any)=>{
    this.dataSource=new MatTableDataSource(res);
    this.dataSource.paginator=this.paginator
        })
  }

  deleteCategory(id:number){
    this._category.deleteCategoryById(id).subscribe((res:any)=>{
      this.getAllCategories()
    },
    (error) => {
      console.log(error);
    })
  }
  getCategory(id:number){
    this._category.getCategoryById(id).subscribe(
      (res:any) => {
        console.log(res.categoryName);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openEditDialog(data:any){
    const dialogRef=this._dialog.open(CategoriesPopupComponent,{
      data
    })
    dialogRef.afterClosed().subscribe((res:any)=>{
      if(res){
        this.getAllCategories();
      }
     })
  }

}
