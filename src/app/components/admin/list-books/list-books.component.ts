import { UserInterface } from './../../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { BookInterface } from './../../../models/book';
import { DataApiService } from './../../../services/data-api.service';
import { Component, OnInit } from '@angular/core';
import{NgForm} from '@angular/forms';


@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private authService: AuthService, private dataApi: DataApiService) { }

  private books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }

  getListBooks(){
    this.dataApi.getAllBooks().subscribe(books => {
      this.books=books;
    });
  }

  onDeleteBook(idBook: string){
    console.log('Delete Book', idBook);
    const confirmacion= confirm('Quieres eliminar el libro?');
    if(confirmacion){
      this.dataApi.deleteBook(idBook);
    }
  }

  onPreUpdateBook(book: BookInterface){
    this.dataApi.selectedBook=Object.assign({},book);
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        this.userUid= auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole=>{
          this.isAdmin = Object.assign({},userRole.roles).hasOwnProperty('admin');
        })
      }
    })
  }

}
