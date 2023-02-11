import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrls: ['./asignar-alumnos.component.css']
})
export class AsignarAlumnosComponent implements OnInit{

  curso: Curso;
  alumnos: Alumno[] = [];
  alumnosAsignar: Alumno[] = [];
  mostrarColumnas: string[] = ['nombre', 'apellido', 'seleccion'];
  columnasAlumnos: string[] = ['id', 'nombre', 'apellido', 'email'];

  seleccion: SelectionModel<Alumno> = new SelectionModel<Alumno>(true, []);

  constructor(private route: ActivatedRoute,
   private cursoService: CursoService,
   private alumnoService: AlumnoService ){}

   ngOnInit(): void {
       this.route.paramMap.subscribe(params => {
        const id: number = + params.get('id');
        this.cursoService.ver(id).subscribe(c => {
          this.curso= c;
          this.alumnos = this.curso.alumnos;
        });
       });
   }

   filtrar(nombre: string): void{
    nombre = nombre !== undefined? nombre.trim(): '';
    if(nombre!== ''){
      this.alumnoService.filtrarPorNombre(nombre)
      .subscribe(alumnos => 
        this.alumnosAsignar = alumnos.filter(a => {
          let filtrar = true;
          //Con este filtro evitamos agregar los alumnos que ya estan en algun curso
          this.alumnos.forEach(ca => {
            if(a.id === ca.id){
              filtrar = false;
            }
          });
          return filtrar;
        }));
    }
   }

   estanTodosSeleccionados(): boolean{
    const seleccionados = this.seleccion.selected.length;
    const numAlumnos = this.alumnosAsignar.length;
    return (seleccionados === numAlumnos);
   }

   seleccionarTodos(): void{
    this.estanTodosSeleccionados()? 
    this.seleccion.clear(): 
    this.alumnosAsignar.forEach(a => this.seleccion.select(a));
   }

   asignar(): void{
    this.cursoService.asignarAlumnos(this.curso, this.seleccion.selected)
    .subscribe({
      next: () => {
      },
      complete: () => {
        Swal.fire('Asignados: ', 
        'Alumnos asignados con éxito al curso', 'success');
        this.alumnos = this.alumnos.concat(this.seleccion.selected);
        this.alumnosAsignar = [];
        this.seleccion.clear();
      },
      error: (e) => {
        if (e.status === 500) {
          const mensaje = e.error.message as string;
          if(mensaje.indexOf('ConstraintViolationException') > -1){
            Swal.fire('Error: ', 
            'El alumno ya está inscrito a algún otro curso, no se pudo asignar', 'error');
          }else{
            Swal.fire('Error: ', 
            'Ocurrió un error al asignar', 'error');
          }
        }
      }
    });
   }
}
