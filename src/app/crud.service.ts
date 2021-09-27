/* Angular Imports */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* App Imports */

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  
  /* PROPERTIES */
  userData: any;
  
  /* CONSTRUCTOR */
  constructor(private http: HttpClient) { }

  /* METHODS */
  //GET: Llamar todos los usuarios y sus detalles
  getUsers() {
    return this.http.get('http://localhost/users.php');
  }

  //POST: Añade un nuevo usuario
  addUser(userData: any) {
    return this.http.post('http://localhost/users.php', userData).subscribe(() => {
      //Llamamos a getUsers para actualizar los usuarios
      this.getUsers();
    });
  }

  //DELETE: Borramos usuario
  deleteUser (userId: any) {
    return this.http.post('http://localhost/users.php/', userId)
      .subscribe();
  }
}
