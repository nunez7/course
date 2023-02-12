import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { Examen } from 'src/app/models/examen';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-responder-examen',
  templateUrl: './responder-examen.component.html'
})
export class ResponderExamenComponent implements OnInit{

  alumno: Alumno;
  curso: Curso;
  examenes: Examen[] = [];

  mostrarColumnasExamenes = ['id', 'nombre', 'asignaturas', 'preguntas', 'responder', 'ver'];

  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSizeOptions = [3,6,9,20,50];

  constructor(private route: ActivatedRoute,
    private alumnoService: AlumnoService,
    private cursoService: CursoService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const id = +params.get('id');
      this.alumnoService.ver(id).subscribe(alumno => {
        this.alumno = alumno;
        this.cursoService.obtenerCursoPorAlumnoId(this.alumno)
        .subscribe(curso =>{
          this.curso = curso;
          this.examenes = (curso && curso.examenes)? curso.examenes: [];
          this.dataSource = new MatTableDataSource<Examen>(this.examenes);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        });
      });
    });
  }



}
