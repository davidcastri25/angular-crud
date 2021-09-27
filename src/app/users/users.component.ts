/* Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Third-Party Imports */
import Swal from 'sweetalert2';

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
  constructor(
    private crudService: CrudService,
    private router: Router) { }

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

  //Llamamos al método del servicio para borrar un usuario
  deleteUser(id: any) {
    if(confirm("¿Borrar usuario?")) {
      //Inicializamos params object
      var myFormData = new FormData();

      //Asignamos parámetros
      myFormData.append('deleteid', id);
      this.crudService.deleteUser(myFormData);

      //Sweetalert message popup
      Swal.fire({
        title: 'Éxito',
        text: 'El usuario ha sido eliminado correctamente',
        icon: 'success'
      });

      //Recargamos los usuarios
      this.getUsers(); 
    }
  }
}
