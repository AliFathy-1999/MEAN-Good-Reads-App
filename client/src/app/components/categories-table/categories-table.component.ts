import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
books!:any
data: any;
totalCount!:number
pageSize!:number
currentPageIndex:number=1
totalPages!:number

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

  displayedColumns: string[] = ['_id','name','action'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCategories(){
   this._category.getCategory(this.currentPageIndex,4).subscribe((res:any)=>{
    this.books=res.data.docs;
    this.totalCount=res.data.docs.totaalDocs
    this.totalPages=res.data.totalPages
    this.dataSource=new MatTableDataSource(this.books);
    this.dataSource.paginator=this.paginator
        })
  }


  onPageChanged(event: PageEvent) {
    const newPageIndex = event.pageIndex;
    const newPageSize = event.pageSize;
    if (newPageIndex !== this.currentPageIndex || newPageSize !== this.pageSize) {
      this.currentPageIndex = newPageIndex;
      this.pageSize = newPageSize;
      this._category.getCategory(this.currentPageIndex, this.pageSize).subscribe((result) => {
        this.data = result.data;
        this.totalCount = result.totalCount;
        this.dataSource = new MatTableDataSource(result.data.docs);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  
  onPreviousPage() {
    if (this.currentPageIndex > 1) {
      this.currentPageIndex--;
      this._category.getCategory(this.currentPageIndex, 4).subscribe((result) => {
        this.data = result.data;
        this.totalCount = result.totalCount;
        this.dataSource = new MatTableDataSource(result.data.docs);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  
  onNextPage() {
    console.log(this.currentPageIndex)
    if (this.currentPageIndex < this.totalPages) {
      console.log(this.currentPageIndex)
      this.currentPageIndex++;
      this._category.getCategory(this.currentPageIndex, 4).subscribe((result) => {
        this.data = result.data;
        this.totalCount = result.totalCount;
        this.dataSource = new MatTableDataSource(result.data.docs);
        this.dataSource.paginator = this.paginator;
      });
    }
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
        console.log(res.name);
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
