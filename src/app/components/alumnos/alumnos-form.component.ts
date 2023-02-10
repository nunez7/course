import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent {

  titulo = "Formulario alumnos";
  alumno: Alumno = new Alumno();

  error: any;

  constructor(private service: AlumnoService, 
    private router: Router){}

  public crear(): void{
    this.service.crear(this.alumno).subscribe(alumno => {
      console.log(alumno);
      alert(`Alumno ${alumno.nombre} creado con éxito`);
      this.router.navigate(['/alumnos']);
    }, err => {
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

}
