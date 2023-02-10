import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';
import { CommonFormComponent } from '../commont-form.component';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent 
extends CommonFormComponent<Alumno, AlumnoService> implements OnInit {

  private fotoSeleccionada: File;

  constructor(service: AlumnoService,
    router: Router,
    route: ActivatedRoute) { 
        super(service, router, route);
        this.titulo = "Formulario alumnos";
        this.model = new Alumno();
        this.redirect= '/alumnos';
        this.nombreModel = Alumno.name;
    }

    seleccionarFoto(event: any):void{
      this.fotoSeleccionada = event.target.files[0];
      console.info(this.fotoSeleccionada);
    }

    public override crear(): void{
      if(!this.fotoSeleccionada){
        super.crear();
      }else{
        this.service.crearConFoto(this.model, this.fotoSeleccionada).subscribe({
          next: (params) => {
            //console.log('queryParams', params);
            this.model = params;
          },
          complete: () => {
            console.log('Creado');
            Swal.fire('Nuevo: ', `Alumno ${this.model.nombre} creado con éxito`, 'success');
            this.router.navigate([this.redirect]);
          },
          error: (e) => {
            if (e.status === 400) {
              this.error = e.error;
              console.log(this.error);
            }
          }
        });
      }
    }

    public override editar(): void{
      if(!this.fotoSeleccionada){
        super.editar();
      }else{
        this.service.editarConFoto(this.model, this.fotoSeleccionada).subscribe({
          next: (params) => {
            //console.log('queryParams', params);
            this.model = params;
          },
          complete: () => {
            Swal.fire('Modificado: ', `Alumno ${this.model.nombre} modificado con éxito`, 'success');
            this.router.navigate([this.redirect]);
          },
          error: (e) => {
            if (e.status === 400) {
              this.error = e.error;
              console.log(this.error);
            }
          }
        });
      }
    }
}
