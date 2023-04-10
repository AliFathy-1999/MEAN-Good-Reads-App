import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudBookComponent } from '../crud-book/crud-book.component';
import { BooksService } from 'src/app/services/books.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { Book } from 'src/app/dataTypes/typesModule';

@Component({
  selector: 'app-admin-book',
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin-book.component.css']
})
export class AdminBookComponent implements OnInit,AfterViewInit{
  data: any;
  totalCount!:number
  pageSize!:number
  ngOnInit(): void {
    this.getAllBooks();
      }

constructor(private _dialog:MatDialog, private _book:BooksService){}
books:Book[]=[]
currentPageIndex:number=1
totalPages!:number

openDialog(){
 const dialogRef= this._dialog.open(CrudBookComponent);
 dialogRef.afterClosed().subscribe({
  next:(res:any)=>{
  if(res){
    this.getAllBooks();
  }
  }
})
}

  displayedColumns: string[] = ['id', 'bookImage', 'name','description', 'categoryId','authorId'
  ,'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

getAllBooks(){
  this._book.getAllBooks(1,10).subscribe((res:any)=>{
  this.books=res.data.docs;
  this.totalCount=res.data.docs.totaalDocs
  this.totalPages=res.data.totalPages
console.log(res)
  console.log(this.books)
  this.dataSource=new MatTableDataSource(this.books);
  this.dataSource.paginator=this.paginator
  })
}

deleteBook(id:number){
this._book.deleteBookById(id).subscribe((res:any)=>{
  this.getAllBooks();
})
}

onPageChanged(event: PageEvent) {
  const newPageIndex = event.pageIndex;
  const newPageSize = event.pageSize;
  if (newPageIndex !== this.currentPageIndex || newPageSize !== this.pageSize) {
    this.currentPageIndex = newPageIndex;
    this.pageSize = newPageSize;
    this._book.getAllBooks(this.currentPageIndex, this.pageSize).subscribe((result) => {
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
    this._book.getAllBooks(this.currentPageIndex, 10).subscribe((result) => {
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
    this._book.getAllBooks(this.currentPageIndex, 10).subscribe((result) => {
      this.data = result.data;
      this.totalCount = result.totalCount;
      this.dataSource = new MatTableDataSource(result.data.docs);
      this.dataSource.paginator = this.paginator;
    });
  }
}

openEditDialog(data:any){
  const dialogRef=this._dialog.open(CrudBookComponent,{
    data
  })
  dialogRef.afterClosed().subscribe((res:any)=>{
    if(res){
      this.getAllBooks();
    }
   })
}

}
