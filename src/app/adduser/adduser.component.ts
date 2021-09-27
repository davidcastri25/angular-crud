/* Angular Imports */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* Third-Party Imports */
import Swal from 'sweetalert2';

/* App Imports */
import { CrudService } from '../crud.service';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})

export class AdduserComponent implements OnInit {

  /* PROPERTIES */
  registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]]
  });

  submitted = false;

  /* CONSTRUCTOR */
  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /* METHODS */
  //Para no tener que poner en el template del formulario registerForm.controls constantemente
  get formControls() { 
    return this.registerForm.controls; 
  }

  //Método ejecutado en el evento onSubmit del formulario
  onSubmit() {

    //Cambiamos submitted a true  
    this.submitted = true;

    //Si el formulario es inválido paramos aquí
    if (this.registerForm.invalid) {
      return;
    }

    //True if all the fields are filled
    if(this.submitted) {
            
      // Inicializamos un params object
      var myFormData = new FormData();
    
      //Asignamos parámetros    
      myFormData.append('myUsername', this.registerForm.value.firstName);

      myFormData.append('myEmail', this.registerForm.value.email);
    
      //Llamamos addUser en nuestro servicio CRUD y le pasamos los parámetros
      this.crudService.addUser(myFormData);

      //Sweetalert message popup
      Swal.fire({
        title: 'Éxito',
        text: 'El usuario ha sido creado correctamente',
        icon: 'success'
      });
      
      //Después de darle a submit, navegamos a users
      // this.router.navigate([`/users`]);
    } 
  }
}
