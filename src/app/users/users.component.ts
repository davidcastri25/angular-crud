/* Angular Imports */
import { Component, OnInit } from '@angular/core';

/* App Imports */
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  /* PROPERTIES */
  data: any[] = [];

  /* CONSTRUCTOR */
  constructor(private crudService: CrudService) { }

  /* LIFECYCLE HOOKS */
  ngOnInit(): void {
    this.getUsers();
  }

  /* METHODS */
  //Llamamos todos los usuarios
  getUsers() {
    this.crudService.getUsers()
      .subscribe((users: any) => {
        this.data = users;
      });
  }

}
