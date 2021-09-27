import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  /* PROPERTIES */
  id:any;
  user:any='';
  //Form
  editForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],   
    firstName: ['', [Validators.required]]
  });
  submitted = false;

  /* CONSTRUCTOR */
  constructor(
    private activatedRoute: ActivatedRoute, 
    private crudService: CrudService, 
    private formBuilder: FormBuilder, 
    private router: Router
  ) { 
    //Obtenemos la ID
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
    //Inicializamos el objeto param
    var myFormData = new FormData();
        
    //Asignamos parámetros  
    myFormData.append('userid', this.id);
  
    //Llamamos al servicio
    this.crudService.getSingleUser(myFormData);
    setTimeout(()=>{ 
      this.user = this.crudService.singleUserData;
      this.editForm.controls["firstName"].setValue(this.user.username);
      this.editForm.controls["email"].setValue(this.user.email);
    }, 100);
  }

  ngOnInit(): void {
  }

  /* METHODS */
  get f() { 
    return this.editForm.controls; 
  }

  onSubmit() {
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
        return;
    }

    //True if all the fields are filled
    if(this.submitted) {  
      // Initialize Params Object
      var myFormData = new FormData();
    
      // Begin assigning parameters
      myFormData.append('updateUsername', this.editForm.value.firstName);
      myFormData.append('updateEmail', this.editForm.value.email);
      myFormData.append('updateid', this.user.id);
      
      //Actualizamos datos
      this.crudService.updateUser(myFormData);

      //Sweetalert message popup
      Swal.fire({
        title: 'Éxito',
        text: 'El usuario ha sido actualizado correctamente',
        icon: 'success'
      });

      //Navegamos a users
      // this.router.navigate([`/users`]);
    }
  }
}
