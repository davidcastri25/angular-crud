import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  /* PROPERTIES */
  id: any;
  user: any = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {

    //Obtenemos la ID de nuestra ruta actual
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    //Inicializamos objeto params
    var myFormData = new FormData();
        
    //Asignamos parámetros  
    myFormData.append('userid', this.id);
  
    //Llamamos al servicio
    this.crudService.getSingleUser(myFormData);
    setTimeout(()=>{ 
      this.user = this.crudService.singleUserData;
    }, 100);
   }

  ngOnInit(): void {
  }

}
