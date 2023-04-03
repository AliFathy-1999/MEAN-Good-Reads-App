import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudBookComponent } from '../crud-book/crud-book.component';
import { BooksService } from 'src/app/services/books.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-admin-book',
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin-book.component.css']
})
export class AdminBookComponent implements OnInit,AfterViewInit{

  ngOnInit(): void {
    this.getAllBooks();
      }

constructor(private _dialog:MatDialog, private _book:BooksService){}



openDialog(){
 const dialogRef= this._dialog.open(CrudBookComponent);
 dialogRef.afterClosed().subscribe((res:any)=>{
  if(res){
    this.getAllBooks();
  }
 })
}

  displayedColumns: string[] = ['id', 'photo', 'bookName', 'categoryId', 'authorId','action'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

getAllBooks(){
  this._book.getAllBooks().subscribe((res:any)=>{
this.dataSource=new MatTableDataSource(res);
this.dataSource.paginator=this.paginator
  })
}

deleteBook(id:number){
this._book.deleteBookById(id).subscribe((res:any)=>{
  this.getAllBooks();
})
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
