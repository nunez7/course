import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent implements OnInit {

  titulo = "Formulario alumnos";
  alumno: Alumno = new Alumno();

  error: any;

  constructor(private service: AlumnoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.service.ver(id).subscribe(alumno => this.alumno = alumno)
      }
    })
  }

  public crear(): void {
    this.service.crear(this.alumno).subscribe({
      next: (params) => {
        //console.log('queryParams', params);
        this.alumno = params;
      },
      complete: () => {
        console.log('Creado');
        Swal.fire('Nuevo: ', `Alumno ${this.alumno.nombre} creado con éxito`, 'success');
        this.router.navigate(['/alumnos']);
      },
      error: (e) => {
        if (e.status === 400) {
          this.error = e.error;
          console.log(this.error);
        }
      }
    });
  }

  public editar(): void {
    this.service.editar(this.alumno).subscribe({
      next: (params) => {
        this.alumno = params;
      },
      complete: () => {
        Swal.fire('Modificado: ', `Alumno ${this.alumno.nombre} actualizado con éxito`, 'success');
        this.router.navigate(['/alumnos']);
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
