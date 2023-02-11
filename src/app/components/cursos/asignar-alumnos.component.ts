import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrls: ['./asignar-alumnos.component.css']
})
export class AsignarAlumnosComponent implements OnInit{

  curso: Curso;

  alumnosAsignar: Alumno[];
  mostrarColumnas: string[] = ['Nombre', 'Apellido'];

  constructor(private route: ActivatedRoute,
   private cursoService: CursoService,
   private alumnoService: AlumnoService ){}

   ngOnInit(): void {
       this.route.paramMap.subscribe(params => {
        const id: number = + params.get('id');
        this.cursoService.ver(id).subscribe(c => this.curso= c);
       });
   }
}
